from datetime import datetime, timezone, timedelta
from notion_client import Client

KST = timezone(timedelta(hours=9))


def _get_thumbnail(entry):
    """Extract thumbnail/image URL from a feedparser entry."""
    # media:thumbnail (YouTube, some RSS)
    if hasattr(entry, "media_thumbnail") and entry.media_thumbnail:
        return entry.media_thumbnail[0].get("url")
    # media:content
    if hasattr(entry, "media_content") and entry.media_content:
        for m in entry.media_content:
            if m.get("type", "").startswith("image"):
                return m.get("url")
    # enclosure
    if hasattr(entry, "enclosures") and entry.enclosures:
        for enc in entry.enclosures:
            if enc.get("type", "").startswith("image"):
                return enc.get("href") or enc.get("url")
    # <image> tag inside entry (some Naver blogs)
    if hasattr(entry, "image") and entry.image:
        img = entry.image
        if isinstance(img, dict):
            return img.get("href") or img.get("url")
        return str(img)
    return None


def _get_summary(entry, max_chars=110):
    """Return first max_chars of summary/description, raw from RSS."""
    for attr in ("summary", "description", "content"):
        val = getattr(entry, attr, None)
        if val:
            if isinstance(val, list):
                val = val[0].get("value", "")
            # Strip HTML tags minimally
            import re
            val = re.sub(r"<[^>]+>", "", val).strip()
            if val:
                return val[:max_chars]
    return ""


def _format_kst(dt):
    """Format a timezone-aware datetime to KST string."""
    kst_dt = dt.astimezone(KST)
    return kst_dt.strftime("%Y-%m-%d %H:%M KST")


def _image_block(url):
    return {
        "object": "block",
        "type": "image",
        "image": {"type": "external", "external": {"url": url}},
    }


def _paragraph_block(text, color="default", bold=False):
    return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
            "rich_text": [
                {
                    "type": "text",
                    "text": {"content": text},
                    "annotations": {"bold": bold, "color": color},
                }
            ]
        },
    }


def _link_paragraph_block(title, url):
    return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
            "rich_text": [
                {
                    "type": "text",
                    "text": {"content": title, "link": {"url": url}},
                    "annotations": {"bold": True},
                }
            ]
        },
    }


def _heading2_block(text):
    return {
        "object": "block",
        "type": "heading_2",
        "heading_2": {
            "rich_text": [{"type": "text", "text": {"content": text}}]
        },
    }


def _divider_block():
    return {"object": "block", "type": "divider", "divider": {}}


def _build_section_blocks(label, items, include_summary):
    """Build Notion blocks for one section."""
    blocks = [_heading2_block(label)]

    for dt, entry in items:
        title = getattr(entry, "title", "제목 없음") or "제목 없음"
        link = getattr(entry, "link", "") or ""
        # _briefing_source is set in main.fetch_feed()
        source_name = entry.get("_briefing_source", "") if hasattr(entry, "get") else ""
        if not source_name:
            source = getattr(entry, "source", {})
            if source and isinstance(source, dict):
                source_name = source.get("title", "")

        # Image
        thumb = _get_thumbnail(entry)
        if thumb:
            blocks.append(_image_block(thumb))

        # Title as link
        if link:
            blocks.append(_link_paragraph_block(title, link))
        else:
            blocks.append(_paragraph_block(title, bold=True))

        # Summary (news only)
        if include_summary:
            summary = _get_summary(entry)
            if summary:
                blocks.append(_paragraph_block(summary))

        # Meta: source name + datetime
        meta_parts = []
        if source_name:
            meta_parts.append(source_name)
        meta_parts.append(_format_kst(dt))
        blocks.append(_paragraph_block(" · ".join(meta_parts), color="gray"))

    return blocks


def publish_briefing(notion_key, parent_page_id, title, sections):
    """
    Create a Notion page with the daily briefing.

    sections: list of (label, items, include_summary)
      items: list of (datetime, feedparser_entry)
    Returns the URL of the created page.
    """
    client = Client(auth=notion_key)

    all_blocks = []
    for i, (label, items, include_summary) in enumerate(sections):
        if i > 0:
            all_blocks.append(_divider_block())
        all_blocks.extend(_build_section_blocks(label, items, include_summary))

    # Notion API: max 100 blocks per append call
    page = client.pages.create(
        parent={"type": "page_id", "page_id": parent_page_id},
        properties={
            "title": {
                "title": [{"type": "text", "text": {"content": title}}]
            }
        },
        children=all_blocks[:100],
    )
    page_id = page["id"]
    page_url = page.get("url", f"https://notion.so/{page_id.replace('-', '')}")

    # Append remaining blocks if any
    remaining = all_blocks[100:]
    chunk_size = 100
    for i in range(0, len(remaining), chunk_size):
        chunk = remaining[i : i + chunk_size]
        client.blocks.children.append(block_id=page_id, children=chunk)

    return page_url
