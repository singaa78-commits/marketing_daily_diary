# 가시제거연구소 데일리 브리핑

매일 09:00 KST에 RSS 피드를 파싱하여 노션 페이지를 자동 생성하는 시스템.

---

## 사전 준비

### 1. 환경변수 등록

`.env` 파일 생성 (`.gitignore`에 포함됨):

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PARENT_PAGE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

| 변수명 | 설명 |
|--------|------|
| `NOTION_API_KEY` | 노션 통합(Integration) API 키. [노션 개발자 페이지](https://www.notion.so/my-integrations)에서 발급 |
| `NOTION_PARENT_PAGE_ID` | 브리핑 페이지를 만들 부모 페이지 ID. 노션 페이지 URL의 마지막 32자리 |

### 2. 노션 통합 연결

노션에서 부모 페이지를 열고 → 오른쪽 상단 `···` → `연결 추가` → 생성한 통합 선택.

### 3. 패키지 설치

```bash
pip install -r requirements.txt
```

### 4. 실행 테스트

```bash
python main.py
```

### 5. 매일 09:00 KST 자동 실행 (cron 예시)

```cron
0 0 * * * cd /path/to/daily-briefing && python main.py >> /var/log/briefing.log 2>&1
```

> cron은 UTC 기준. KST 09:00 = UTC 00:00.

---

## RSS 피드 목록

### 시장 뉴스 (수산가공·1인가구·워킹맘 간편식)

| 매체명 | RSS URL | 도메인 | 카테고리 |
|--------|---------|--------|----------|
| 식품음료신문 | `https://www.thinkfood.co.kr/rss/allArticle.xml` | `thinkfood.co.kr` | 식품산업 전문지 |
| 더바이어 유통 | `https://www.withbuyer.com/rss/S1N1.xml` | `withbuyer.com` | 유통·식품업계 전문지 |
| 이투데이 산업 | `https://rss.etoday.co.kr/eto/industry_news.xml` | `rss.etoday.co.kr` | 산업 경제지 |
| 아이뉴스24 생활 | `https://rss.inews24.com/rss/news_life.xml` | `rss.inews24.com` | 생활·소비 뉴스 |
| 이투데이 경제 | `https://rss.etoday.co.kr/eto/economy_news.xml` | `rss.etoday.co.kr` | 경제지 |

### 경쟁사 네이버 블로그

| 블로그명 | RSS URL | 도메인 | 비고 |
|----------|---------|--------|------|
| 고래사어묵 공식블로그 | `https://rss.blog.naver.com/goraesa.xml` | `rss.blog.naver.com` | 수산가공식품 경쟁사 |
| CJ제일제당 공식블로그 | `https://rss.blog.naver.com/cjcheiljedang.xml` | `rss.blog.naver.com` | 간편식 대형 경쟁사 |
| 사조그룹 공식블로그 | `https://rss.blog.naver.com/sajo_official.xml` | `rss.blog.naver.com` | 수산식품 경쟁사 |
| 농심 공식블로그 | `https://rss.blog.naver.com/nongshimblog.xml` | `rss.blog.naver.com` | 간편식 경쟁사 |

### 경쟁사 유튜브

| 채널명 | RSS URL | 채널 ID | 비고 |
|--------|---------|---------|------|
| 입질의추억TV (jiminTV) | `https://www.youtube.com/feeds/videos.xml?channel_id=UCY2uWQDCzn_ZE-JpTfDRR2A` | `UCY2uWQDCzn_ZE-JpTfDRR2A` | 수산물 전문 유튜버 (구독 50만+) |
| 수상한생선 Life Science | `https://www.youtube.com/feeds/videos.xml?channel_id=UCJJ_n7RI2ALoo5wdX2qzmYA` | `UCJJ_n7RI2ALoo5wdX2qzmYA` | 해수부 선정 수산콘텐츠 협력자 |
| 후다닥요리 | `https://www.youtube.com/feeds/videos.xml?channel_id=UC7ok_PMSTIY5Qg4ULxRoSNg` | `UC7ok_PMSTIY5Qg4ULxRoSNg` | 간편 집밥 요리 채널 |

> 검증 일자: 2026-05-15. HTTP 200 + 유효 XML 확인 완료.

---

## 허용 도메인

| 도메인 | 용도 |
|--------|------|
| `api.notion.com` | 노션 API (페이지 생성) |
| `pypi.org` | Python 패키지 인덱스 |
| `files.pythonhosted.org` | Python 패키지 다운로드 |
| `rss.etoday.co.kr` | 이투데이 RSS |
| `rss.inews24.com` | 아이뉴스24 RSS |
| `www.thinkfood.co.kr` | 식품음료신문 RSS |
| `www.withbuyer.com` | 더바이어 RSS |
| `rss.etoday.co.kr` | 이투데이 RSS (산업·경제) |
| `rss.blog.naver.com` | 네이버 블로그 RSS |
| `www.youtube.com` | 유튜브 RSS |

---

## 파일 구조

```
daily-briefing/
├── main.py              # 메인 실행 파일
├── feeds.py             # RSS URL 목록
├── notion_publisher.py  # 노션 페이지 생성
├── requirements.txt     # 의존성
├── CLAUDE.md            # 원격 루틴 작업 지시서
├── README.md            # 이 파일
├── .gitignore           # .env 포함
└── .env                 # 환경변수 (git 제외)
```

---

## 노션 페이지 구조

- **제목**: `[가시제거연구소 데일리 브리핑] YYYY-MM-DD`
- **섹션 순서**: 시장 핵심 뉴스 → 경쟁사 네이버 블로그 → 경쟁사 유튜브
- **섹션 라벨**:
  - 24h 신규 있음: `🆕 24시간 내 신규 N건`
  - 폴백 발동: `📚 24h 신규 없음 — 최근 N건 참고`

---

## 주의사항

- AI API(LLM 요약·번역 등) 호출 완전 금지
- `python main.py` 외 추가 작업 금지
- RSS 원본 텍스트만 사용 (description 앞 110자 절단만 허용)
