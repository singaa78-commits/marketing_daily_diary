# RSS feed URLs — all verified: HTTP 200 + valid XML as of 2026-05-15
# Verification method: urllib.request fetch + xml.etree.ElementTree parse

MARKET_NEWS_FEEDS = [
    {
        "name": "식품음료신문",
        "url": "https://www.thinkfood.co.kr/rss/allArticle.xml",
        "domain": "thinkfood.co.kr",
    },
    {
        "name": "더바이어 유통",
        "url": "https://www.withbuyer.com/rss/S1N1.xml",
        "domain": "withbuyer.com",
    },
    {
        "name": "이투데이 산업",
        "url": "https://rss.etoday.co.kr/eto/industry_news.xml",
        "domain": "rss.etoday.co.kr",
    },
    {
        "name": "아이뉴스24 생활",
        "url": "https://rss.inews24.com/rss/news_life.xml",
        "domain": "rss.inews24.com",
    },
    {
        "name": "이투데이 경제",
        "url": "https://rss.etoday.co.kr/eto/economy_news.xml",
        "domain": "rss.etoday.co.kr",
    },
]

NAVER_BLOG_FEEDS = [
    {
        "name": "고래사어묵 공식블로그",
        "url": "https://rss.blog.naver.com/goraesa.xml",
        "domain": "rss.blog.naver.com",
    },
    {
        "name": "CJ제일제당 공식블로그",
        "url": "https://rss.blog.naver.com/cjcheiljedang.xml",
        "domain": "rss.blog.naver.com",
    },
    {
        "name": "사조그룹 공식블로그",
        "url": "https://rss.blog.naver.com/sajo_official.xml",
        "domain": "rss.blog.naver.com",
    },
    {
        "name": "농심 공식블로그",
        "url": "https://rss.blog.naver.com/nongshimblog.xml",
        "domain": "rss.blog.naver.com",
    },
]

YOUTUBE_FEEDS = [
    {
        "name": "입질의추억TV (jiminTV)",
        "channel_id": "UCY2uWQDCzn_ZE-JpTfDRR2A",
        "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCY2uWQDCzn_ZE-JpTfDRR2A",
        "domain": "youtube.com",
    },
    {
        "name": "수상한생선 Life Science",
        "channel_id": "UCJJ_n7RI2ALoo5wdX2qzmYA",
        "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCJJ_n7RI2ALoo5wdX2qzmYA",
        "domain": "youtube.com",
    },
    {
        "name": "후다닥요리",
        "channel_id": "UC7ok_PMSTIY5Qg4ULxRoSNg",
        "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC7ok_PMSTIY5Qg4ULxRoSNg",
        "domain": "youtube.com",
    },
]
