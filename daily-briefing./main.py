import os
import sys
import feedparser
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
from feeds import MARKET_NEWS_FEEDS, NAVER_BLOG_FEEDS, YOUTUBE_FEEDS
from notion_publisher import publish_briefing

load_dotenv()

KST = timezone(timedelta(hours=9))
MAX_NEWS = 3
MAX_BLOG = 5
MAX_YOUTUBE = 5


def now_kst():
    return datetime.now(KST)


def parse_entry_dt(entry):
    """Return timezone-aware datetime from a feedparser entry, or None."""
    for attr in ("published_parsed", "updated_parsed"):
        t = getattr(entry, attr, None)
        if t:
            try:
                return datetime(*t[:6], tzinfo=timezone.utc).astimezone(KST)
            except Exception:
                continue
    return None


def fetch_feed(feed_info):
    """Fetch and parse a single RSS feed. Returns (feed_info, entries, error_str).
    Each entry gets a _briefing_source attribute with the feed name."""
    name = feed_info["name"]
    url = feed_info["url"]
    try:
        parsed = feedparser.parse(url)
        if parsed.bozo and not parsed.entries:
            raise ValueError(f"bozo feed: {parsed.bozo_exception}")
        entries = parsed.entries
        for e in entries:
            try:
                e["_briefing_source"] = name
            except Exception:
                pass
        print(f"  ✓ {name}: {len(entries)}건 수집")
        return feed_info, entries, None
    except Exception as e:
        print(f"  ✗ {name}: {e}")
        return feed_info, [], str(e)


def entries_last_24h(entries):
    """Filter entries published within the last 24 hours KST, sorted newest-first."""
    cutoff = now_kst() - timedelta(hours=24)
    result = []
    for e in entries:
        dt = parse_entry_dt(e)
        if dt and dt >= cutoff:
            result.append((dt, e))
    result.sort(key=lambda x: x[0], reverse=True)
    return result


def entries_latest_n(entries, n):
    """Return up to n entries with a valid date, sorted newest-first."""
    dated = []
    for e in entries:
        dt = parse_entry_dt(e)
        if dt:
            dated.append((dt, e))
    dated.sort(key=lambda x: x[0], reverse=True)
    return dated[:n]


def collect_section_news(feeds_list, max_items):
    """Collect market news with 2-stage fallback."""
    print(f"\n[시장 뉴스] 수집 중...")
    all_entries = []
    for fi in feeds_list:
        fi, entries, _ = fetch_feed(fi)
        all_entries.extend(entries)

    recent = entries_last_24h(all_entries)[:max_items]
    if recent:
        label = f"1. 시장 핵심 뉴스 🆕 24시간 내 신규 {len(recent)}건"
        print(f"  → 1순위 {len(recent)}건 (24h 내)")
        return label, recent
    else:
        fallback = entries_latest_n(all_entries, max_items)
        label = f"1. 시장 핵심 뉴스 📚 24h 신규 없음 — 최근 {len(fallback)}건 참고"
        print(f"  → 폴백 발동: {len(fallback)}건 (기간 무제한)")
        return label, fallback


def collect_section_sourced(feeds_list, section_num, section_name, max_items):
    """Collect blog/youtube with 2-stage fallback (per-source for fallback)."""
    print(f"\n[{section_name}] 수집 중...")
    per_source = []
    all_24h = []

    for fi in feeds_list:
        fi, entries, _ = fetch_feed(fi)
        recent = entries_last_24h(entries)
        all_24h.extend(recent)
        per_source.append((fi, entries))

    recent_top = sorted(all_24h, key=lambda x: x[0], reverse=True)[:max_items]

    if recent_top:
        label = f"{section_num}. {section_name} 🆕 24시간 내 신규 {len(recent_top)}건"
        print(f"  → 1순위 {len(recent_top)}건 (24h 내)")
        return label, recent_top

    # Fallback: latest 1 per source, combined up to max_items
    fallback = []
    for fi, entries in per_source:
        latest = entries_latest_n(entries, 1)
        if latest:
            fallback.append(latest[0])
    fallback.sort(key=lambda x: x[0], reverse=True)
    fallback = fallback[:max_items]
    label = f"{section_num}. {section_name} 📚 24h 신규 없음 — 최근 {len(fallback)}건 참고"
    print(f"  → 폴백 발동: {len(fallback)}건 (소스별 최신 1건)")
    return label, fallback


def main():
    notion_key = os.environ.get("NOTION_API_KEY")
    parent_id = os.environ.get("NOTION_PARENT_PAGE_ID")

    if not notion_key or not parent_id:
        print("ERROR: NOTION_API_KEY 또는 NOTION_PARENT_PAGE_ID 환경변수가 없습니다.")
        sys.exit(1)

    today = now_kst().strftime("%Y-%m-%d")
    title = f"[가시제거연구소 데일리 브리핑] {today}"
    print(f"\n{'='*60}")
    print(f"가시제거연구소 데일리 브리핑 생성 시작: {now_kst().strftime('%Y-%m-%d %H:%M:%S KST')}")
    print(f"{'='*60}")

    news_label, news_items = collect_section_news(MARKET_NEWS_FEEDS, MAX_NEWS)
    blog_label, blog_items = collect_section_sourced(
        NAVER_BLOG_FEEDS, 2, "경쟁사 네이버 블로그", MAX_BLOG
    )
    yt_label, yt_items = collect_section_sourced(
        YOUTUBE_FEEDS, 3, "경쟁사 유튜브", MAX_YOUTUBE
    )

    sections = [
        (news_label, news_items, True),    # (label, items, include_summary)
        (blog_label, blog_items, False),
        (yt_label, yt_items, False),
    ]

    print(f"\n[노션] 페이지 생성 중: {title}")
    page_url = publish_briefing(notion_key, parent_id, title, sections)
    print(f"\n{'='*60}")
    print(f"완료! 노션 페이지: {page_url}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
