const storageKey = "marketing-reference-desk-v2";

const categories = [
  "경쟁사 광고",
  "캠페인 아이디어",
  "영상 레퍼런스",
  "레퍼런스 수집",
  "디자인",
  "상세·랜딩",
  "카피·CRM",
  "제품·패키지",
  "트렌드",
  "인사이트·트렌드 리서치",
  "콘텐츠",
  "편집",
  "일러스트",
  "검색/키워드 리서치",
  "소비자/시장 리서치",
  "경쟁사 분석",
  "브랜딩/그래픽",
  "웹/UI 레퍼런스",
  "영상/모션 레퍼런스",
  "사진/푸드 비주얼",
  "타이포/포스터",
];

const folderColors = [
  "#f06a32",
  "#4da463",
  "#c49ab5",
  "#efd35a",
  "#f0a14a",
  "#d9eff5",
  "#58aebc",
  "#e3d4e8",
  "#f7d7a8",
  "#c99c2d",
  "#b8d46b",
  "#a8bfd9",
  "#efc8bc",
  "#7ab3a7",
  "#e08a6a",
  "#9f8fc8",
  "#d86f55",
  "#5f9fc8",
  "#8b8ecf",
  "#7eaa78",
  "#d4b34f",
];

const initialSites = [
  site("Meta Ad Library", "https://www.facebook.com/ads/library/", "경쟁사 광고", "Facebook과 Instagram 광고 소재, 카피, 경쟁 브랜드 집행 현황을 확인합니다.", "오래 집행되는 소재를 우선 저장하면 반응 좋은 광고를 추정하기 쉽습니다."),
  site("TikTok Creative Center", "https://ads.tiktok.com/business/creativecenter/", "경쟁사 광고", "인기 광고, 해시태그, 사운드, 업종별 숏폼 트렌드를 확인합니다.", "초반 3초 훅과 화면 전환 방식을 집중해서 봅니다."),
  site("Google Ads Transparency Center", "https://adstransparency.google.com/", "경쟁사 광고", "Google과 YouTube에서 집행 중인 광고를 확인합니다.", "검색, 디스플레이, 영상 메시지를 나눠 비교합니다."),
  site("Foreplay", "https://www.foreplay.co/", "경쟁사 광고", "광고 소재를 저장하고 팀 단위 스와이프 파일로 관리합니다.", "유료 도구지만 광고 레퍼런스 관리 방식이 좋습니다."),
  site("BigSpy", "https://bigspy.com/", "경쟁사 광고", "여러 플랫폼의 광고 소재를 검색하고 비교하는 광고 인텔리전스 도구입니다.", "무료 범위가 제한될 수 있어 필요한 캠페인에서만 사용합니다."),
  site("Ads of the World", "https://www.adsoftheworld.com/", "캠페인 아이디어", "글로벌 브랜드 캠페인, 옥외, 영상, 인쇄 광고 사례를 모아봅니다.", "아이디어 발산 단계에서 업종별로 훑기 좋습니다."),
  site("Love the Work More", "https://lovetheworkmore.com/", "캠페인 아이디어", "국제 광고제와 수상작 중심으로 캠페인 아이디어를 탐색합니다.", "PR, 바이럴, 런칭 캠페인 참고용입니다."),
  site("Cannes Lions", "https://www.canneslions.com/", "캠페인 아이디어", "글로벌 크리에이티브 캠페인과 수상작 흐름을 확인합니다.", "대형 캠페인 구조와 인사이트 발굴에 씁니다."),
  site("The One Club", "https://www.oneclub.org/", "캠페인 아이디어", "The One Show 중심의 광고, 디자인, 브랜딩 수상 사례를 제공합니다.", "기획서에 넣을 캠페인 사례 조사에 사용합니다."),
  site("D&AD", "https://www.dandad.org/", "캠페인 아이디어", "광고와 디자인 분야의 수상작, 케이스 스터디, 교육 콘텐츠를 확인합니다.", "크리에이티브 퀄리티 기준을 잡을 때 참고합니다."),
  site("Vimeo Staff Picks", "https://vimeo.com/channels/staffpicks", "영상 레퍼런스", "브랜드 필름, 무드 영상, 애니메이션 등 완성도 높은 영상을 찾습니다.", "연출 톤, 리듬, 미술, 편집감을 참고합니다."),
  site("Shots", "https://shots.net/", "영상 레퍼런스", "광고 영상 제작물과 연출, 촬영, 미술 사례를 살펴봅니다.", "TVC나 브랜드 필름 콘셉트 보강용입니다."),
  site("YouTube", "https://youtube.com/", "영상 레퍼런스", "case study, product film, food commercial 같은 검색어로 실제 사례를 찾습니다.", "영어 검색어 조합을 메모해두면 결과가 좋아집니다."),
  site("Pinterest", "https://pinterest.com/", "레퍼런스 수집", "무드보드, 촬영 톤, 그래픽 스타일, 푸드 캠페인 비주얼을 모읍니다.", "검색어는 한국어보다 영어가 더 넓게 잡힙니다."),
  site("Instagram", "https://instagram.com/", "레퍼런스 수집", "글로벌 브랜드의 SNS 운영 방식, 피드 구성, 릴스 톤을 관찰합니다.", "브랜드별 저장 컬렉션을 따로 만들면 편합니다."),
  site("Behance", "https://behance.net/", "레퍼런스 수집", "브랜딩, 패키지, 캠페인 디자인 프로젝트를 포트폴리오 형태로 탐색합니다.", "브랜드 아이덴티티와 패키지 조사에 특히 좋습니다."),
  site("Awwwards", "https://awwwards.com/", "디자인", "글로벌 웹사이트와 인터랙션 디자인 트렌드를 확인합니다.", "비주얼은 강하지만 실무 랜딩 구조는 따로 검토합니다."),
  site("SiteSee", "https://sitesee.co/", "디자인", "감도 높은 웹디자인 아카이브를 모아볼 수 있습니다.", "톤앤매너가 좋은 사이트 탐색용입니다."),
  site("Godly", "https://godly.website/", "디자인", "트렌디한 웹사이트 디자인과 섹션 구성을 찾기 좋습니다.", "B2C 브랜드와 SaaS 레퍼런스 탐색에 씁니다."),
  site("Dribbble", "https://dribbble.com/", "디자인", "UI, 그래픽, 아이콘, 모션 아이디어를 빠르게 훑어봅니다.", "완성 서비스보다 시각 아이디어 스케치로 참고합니다."),
  site("Land-book", "https://land-book.com/", "상세·랜딩", "랜딩페이지, 브랜드 사이트, 상세페이지 레이아웃 구조를 살펴봅니다.", "섹션 순서와 CTA 위치 비교에 유용합니다."),
  site("Lapa Ninja", "https://www.lapa.ninja/", "상세·랜딩", "랜딩페이지 섹션 구성과 카피 구조를 참고합니다.", "카테고리별 랜딩 패턴을 빠르게 찾습니다."),
  site("Mobbin", "https://mobbin.com/", "상세·랜딩", "모바일 앱 UI 플로우와 화면 패턴을 체계적으로 볼 수 있습니다.", "회원가입, 결제, 온보딩 UX 참고용입니다."),
  site("60fps", "https://60fps.design/", "상세·랜딩", "인터랙션과 모션 레퍼런스를 모아봅니다.", "프로모션 페이지 모션 참고에 좋습니다."),
  site("Catch Copy", "https://catchcopy.make1.jp/index.cgi", "카피·CRM", "일본 광고 카피 아카이브로 짧고 선명한 카피 발상에 좋습니다.", "제품 USP를 한 문장으로 바꿀 때 참고합니다."),
  site("Swiped", "https://swiped.co/", "카피·CRM", "실제 광고, 세일즈 카피, 랜딩페이지를 분석해 둔 자료를 제공합니다.", "설득 구조와 헤드라인 분석에 활용합니다."),
  site("Really Good Emails", "https://reallygoodemails.com/", "카피·CRM", "이메일 마케팅 레퍼런스를 목적별로 볼 수 있는 대표 아카이브입니다.", "출시, 할인, 리텐션, 장바구니 이탈 메일 참고용입니다."),
  site("Marketing Examples", "https://marketingexamples.com/", "카피·CRM", "광고, 카피, 랜딩페이지, 성장 전략을 짧은 사례 중심으로 정리합니다.", "기획 논리와 카피 구조를 함께 보기 좋습니다."),
  site("The Dieline", "https://thedieline.com/", "제품·패키지", "제품, F&B, 라이프스타일 패키지 디자인 레퍼런스에 강합니다.", "신제품 패키지와 리브랜딩 참고용입니다."),
  site("Packaging of the World", "https://packagingoftheworld.com/", "제품·패키지", "글로벌 패키지 디자인 사례를 넓게 탐색합니다.", "카테고리별 패키지 룩앤필 비교에 씁니다."),
  site("BP&O", "https://bpando.org/", "제품·패키지", "브랜드 아이덴티티, 패키지, 그래픽 디자인 사례를 깊게 소개합니다.", "브랜딩 논리와 적용 사례를 함께 봅니다."),
  site("TrendHunter", "https://trendhunter.com/", "트렌드", "소비, 브랜드, 제품, 라이프스타일 트렌드와 아이디어를 찾습니다.", "초기 아이데이션과 카테고리 확장 조사용입니다."),
  site("Google Trends", "https://trends.google.com/", "트렌드", "검색 관심도와 키워드 흐름을 비교해 시장 반응을 확인합니다.", "시즌성, 관심도, 키워드 후보 검증에 씁니다."),
  site("Think with Google", "https://www.thinkwithgoogle.com/", "트렌드", "소비자 인사이트, 마케팅 리서치, 캠페인 사례를 제공합니다.", "제안서 인사이트 근거 자료로 좋습니다."),
  site("unDraw", "https://undraw.co/illustrations", "일러스트", "상업적 사용이 가능한 무료 SVG·PNG 일러스트를 제공합니다.", "사용 전 최신 라이선스 조건은 한 번 확인합니다."),
  site("ManyPixels Gallery", "https://www.manypixels.co/gallery", "일러스트", "깔끔한 비즈니스 스타일의 무료 일러스트를 색상 변경해 받을 수 있습니다.", "서비스 소개, 안내 페이지, SNS 카드뉴스에 적합합니다."),
  site("Loose Drawing", "https://loosedrawing.com/", "일러스트", "부드럽고 손그림 느낌의 무료 일러스트를 제공합니다.", "식품, 생활, 감성 콘텐츠에 잘 맞습니다."),
  site("DrawKit", "https://www.drawkit.com/", "일러스트", "2D, 3D, 아이콘, 애니메이션 등 다양한 일러스트 세트를 제공합니다.", "무료와 유료가 섞여 있어 프로젝트별 라이선스를 확인합니다."),
  site("Storyset", "https://storyset.com/", "일러스트", "상황별 일러스트를 색상과 레이어를 바꿔 내려받을 수 있습니다.", "Freepik 라이선스와 출처 표기 여부를 확인합니다."),
];

const trendResearchSites = [
  {
    "name": "네이버 데이터랩",
    "url": "https://datalab.naver.com/?utm_source=chatgpt.com",
    "category": "검색/키워드 리서치",
    "subcategory": "검색 트렌드",
    "description": "검색어 추이, 쇼핑 관심도, 연령·성별 비교",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Google Trends",
    "url": "https://trends.google.com/?utm_source=chatgpt.com",
    "category": "검색/키워드 리서치",
    "subcategory": "검색 트렌드",
    "description": "키워드 관심도, 시즌성, 국가별 비교",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "오픈서베이 트렌드 리포트",
    "url": "https://blog.opensurvey.co.kr/?utm_source=chatgpt.com",
    "category": "소비자/시장 리서치",
    "subcategory": "소비자 리서치",
    "description": "식품·쇼핑·소비자 행동 리포트",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Similarweb",
    "url": "https://www.similarweb.com/?utm_source=chatgpt.com",
    "category": "경쟁사 분석",
    "subcategory": "경쟁사 분석",
    "description": "경쟁사 웹사이트 트래픽·유입 채널 추정",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Exploding Topics",
    "url": "https://explodingtopics.com/?utm_source=chatgpt.com",
    "category": "트렌드",
    "subcategory": "트렌드 발굴",
    "description": "아직 대중화되지 않은 상승 키워드 발굴",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "AnswerThePublic",
    "url": "https://answerthepublic.com/?utm_source=chatgpt.com",
    "category": "검색/키워드 리서치",
    "subcategory": "키워드",
    "description": "소비자가 실제로 검색하는 질문 탐색",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "AlsoAsked",
    "url": "https://alsoasked.com/?utm_source=chatgpt.com",
    "category": "검색/키워드 리서치",
    "subcategory": "검색 아이디어",
    "description": "연관 질문·콘텐츠 주제 발굴",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Pinterest Trends",
    "url": "https://trends.pinterest.com/?utm_source=chatgpt.com",
    "category": "트렌드",
    "subcategory": "비주얼 트렌드",
    "description": "디자인·음식·라이프스타일 검색 트렌드",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Are.na",
    "url": "https://www.are.na/?utm_source=chatgpt.com",
    "category": "레퍼런스 수집",
    "subcategory": "레퍼런스 수집",
    "description": "광고·디자인·문화 레퍼런스 수집",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Savee",
    "url": "https://savee.it/?utm_source=chatgpt.com",
    "category": "레퍼런스 수집",
    "subcategory": "비주얼 큐레이션",
    "description": "감도 높은 그래픽·사진 레퍼런스",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "The Brand Identity",
    "url": "https://the-brandidentity.com/?utm_source=chatgpt.com",
    "category": "디자인",
    "subcategory": "브랜딩",
    "description": "글로벌 브랜드·패키지·그래픽 사례",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Brand New",
    "url": "https://www.underconsideration.com/brandnew/?utm_source=chatgpt.com",
    "category": "디자인",
    "subcategory": "브랜딩",
    "description": "글로벌 리브랜딩 사례 분석",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Fonts In Use",
    "url": "https://fontsinuse.com/?utm_source=chatgpt.com",
    "category": "디자인",
    "subcategory": "타이포",
    "description": "실제 브랜드·광고의 폰트 활용 사례",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Typewolf",
    "url": "https://www.typewolf.com/?utm_source=chatgpt.com",
    "category": "디자인",
    "subcategory": "타이포",
    "description": "웹·브랜드 타이포 조합 참고",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Coolors",
    "url": "https://coolors.co/?utm_source=chatgpt.com",
    "category": "디자인",
    "subcategory": "컬러",
    "description": "브랜드·캠페인 컬러 조합 만들기",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Statista",
    "url": "https://www.statista.com/?utm_source=chatgpt.com",
    "category": "소비자/시장 리서치",
    "subcategory": "데이터/통계",
    "description": "산업·시장 규모·소비자 데이터",
    "memo": "추천도: ★★★★☆"
  }
];

const refSearchSites = [
  {
    "name": "Identity Designed",
    "url": "https://identitydesigned.com/",
    "category": "브랜딩/그래픽",
    "subcategory": "브랜딩",
    "description": "브랜드 아이덴티티 전체 시스템 사례",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Brand Archive",
    "url": "https://brandarchive.xyz/",
    "category": "브랜딩/그래픽",
    "subcategory": "브랜딩",
    "description": "글로벌 브랜드 자산 아카이브",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Rebrand Gallery",
    "url": "https://rebrand.gallery/",
    "category": "브랜딩/그래픽",
    "subcategory": "브랜딩",
    "description": "리브랜딩 전후 사례",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Mindsparkle Mag",
    "url": "https://mindsparklemag.com/",
    "category": "브랜딩/그래픽",
    "subcategory": "브랜딩",
    "description": "브랜딩·패키지·그래픽 큐레이션",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Inspiration Grid",
    "url": "https://theinspirationgrid.com/",
    "category": "브랜딩/그래픽",
    "subcategory": "그래픽",
    "description": "포스터·타이포·패키지·광고 레퍼런스",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Abduzeedo",
    "url": "https://abduzeedo.com/",
    "category": "브랜딩/그래픽",
    "subcategory": "그래픽",
    "description": "그래픽·3D·브랜딩·디지털 아트",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Visual Journal",
    "url": "https://visualjournal.it/",
    "category": "브랜딩/그래픽",
    "subcategory": "그래픽",
    "description": "아트디렉션·편집디자인 레퍼런스",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Poster House",
    "url": "https://posterhouse.org/",
    "category": "타이포/포스터",
    "subcategory": "포스터",
    "description": "포스터 구성·타이포·아트디렉션",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "SiteInspire",
    "url": "https://www.siteinspire.com/",
    "category": "웹/UI 레퍼런스",
    "subcategory": "웹",
    "description": "깔끔한 브랜드·에디토리얼 웹 레퍼런스",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Refs.Gallery",
    "url": "https://refs.gallery/",
    "category": "웹/UI 레퍼런스",
    "subcategory": "웹",
    "description": "웹을 스타일·모션·기능별로 탐색",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Refero",
    "url": "https://refero.design/",
    "category": "웹/UI 레퍼런스",
    "subcategory": "웹/UI",
    "description": "실제 제품 UI·웹 화면 레퍼런스",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Page Flows",
    "url": "https://pageflows.com/",
    "category": "웹/UI 레퍼런스",
    "subcategory": "UI 플로우",
    "description": "가입·결제·온보딩 등 실제 UX 플로우",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Motionographer",
    "url": "https://motionographer.com/",
    "category": "영상/모션 레퍼런스",
    "subcategory": "모션",
    "description": "모션그래픽·광고영상·타이틀 시퀀스",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "LottieFiles",
    "url": "https://lottiefiles.com/",
    "category": "영상/모션 레퍼런스",
    "subcategory": "모션",
    "description": "마이크로 모션·UI 애니메이션 레퍼런스",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "ShotDeck",
    "url": "https://shotdeck.com/",
    "category": "영상/모션 레퍼런스",
    "subcategory": "영상",
    "description": "영화 컷 기준 조명·구도·색감 검색",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "FilmGrab",
    "url": "https://film-grab.com/",
    "category": "영상/모션 레퍼런스",
    "subcategory": "영상",
    "description": "영화 스틸컷 무드·촬영 레퍼런스",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Eyecandy",
    "url": "https://eyecannndy.com/",
    "category": "영상/모션 레퍼런스",
    "subcategory": "영상",
    "description": "카메라워크·편집 기법별 영상 레퍼런스",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "ShotBook",
    "url": "https://shotbook.art/",
    "category": "영상/모션 레퍼런스",
    "subcategory": "영상",
    "description": "영상 컷·광고·편집 레퍼런스 수집",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Ignant",
    "url": "https://www.ignant.com/",
    "category": "사진/푸드 비주얼",
    "subcategory": "사진",
    "description": "감도 높은 사진·아트·에디토리얼 레퍼런스",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "It's Nice That",
    "url": "https://www.itsnicethat.com/",
    "category": "사진/푸드 비주얼",
    "subcategory": "사진",
    "description": "크리에이티브·사진·디자인 사례",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Creative Boom",
    "url": "https://www.creativeboom.com/",
    "category": "사진/푸드 비주얼",
    "subcategory": "사진",
    "description": "사진·브랜드·광고·일러스트 사례",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "World Brand Design Society",
    "url": "https://worldbranddesign.com/",
    "category": "제품·패키지",
    "subcategory": "패키지",
    "description": "패키지·식품 브랜드 디자인",
    "memo": "추천도: ★★★★★"
  },
  {
    "name": "Typographic Posters",
    "url": "https://www.typographicposters.com/",
    "category": "타이포/포스터",
    "subcategory": "타이포",
    "description": "타이포 중심 포스터 레퍼런스",
    "memo": "추천도: ★★★★☆"
  },
  {
    "name": "Logggos",
    "url": "https://www.logggos.club/",
    "category": "브랜딩/그래픽",
    "subcategory": "로고",
    "description": "로고·심볼 레퍼런스",
    "memo": "추천도: ★★★★☆"
  }
];

const notionSites = [
  site("오픈애즈", "https://www.openads.co.kr/home?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "마케팅 주제별 콘텐츠를 온라인 매거진처럼 큐레이션해서 보여주는 플랫폼입니다.", "노션 페이지에서 가져온 링크입니다."),
  site("서핏", "https://www.surfit.io/?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "디자인, 기획, 마케팅 관련 콘텐츠를 큐레이션하는 커리어 플랫폼입니다.", "디자인 관점의 트렌드와 실무 아티클 확인용."),
  site("퍼블리", "https://publy.co/?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "마케팅 용어, 업무 노하우, 커리어 콘텐츠를 얻기 좋은 멤버십 플랫폼입니다.", "실무 개념 정리와 업무 방식 참고용."),
  site("캐릿", "https://www.careet.net/?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "MZ 세대와 소비자 트렌드를 중심으로 마케팅 인사이트를 제공합니다.", "젊은 타깃 캠페인 기획 전에 확인."),
  site("생각노트 블로그", "https://think-note.com/?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "브랜드, IT, 트렌드에 대한 관찰과 분석을 기록하는 개인 블로그입니다.", "브랜드 관점의 생각거리와 사례 분석 참고."),
  site("콘텐타 매거진", "https://magazine.contenta.co/?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "콘텐츠 마케팅에 특화된 아티클을 제공하는 매거진입니다.", "콘텐츠 전략, SEO, B2B 콘텐츠 참고용."),
  site("스모어 블로그", "https://ko-blog.smore.im/", "인사이트·트렌드 리서치", "마케팅 인사이트와 실무 콘텐츠를 제공하는 스모어 공식 블로그입니다.", "마케팅 툴과 콘텐츠 운영 아이디어 확인."),
  site("마케팅 인사이드", "https://inside.ampm.co.kr/insight/13434", "인사이트·트렌드 리서치", "디지털 광고와 마케팅 전략 관련 인사이트를 제공하는 아티클입니다.", "메타 파트너십 광고 등 퍼포먼스 전략 참고."),
  site("아이보스", "https://www.i-boss.co.kr/?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "국내 마케터 커뮤니티와 온라인 마케팅 정보를 볼 수 있는 포털입니다.", "실무 질문, 사례, 업계 분위기 확인용."),
  site("DMC리포트", "https://www.dmcreport.co.kr/?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "디지털 마케팅 이슈, 트렌드, 키워드 관련 리포트를 확인할 수 있습니다.", "제안서와 리서치 근거 자료로 활용."),
  site("메조미디어", "https://www.mezzomedia.co.kr/insight-m?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "연령대별 디지털 라이프스타일과 SNS 시장 현황 관련 리포트를 제공합니다.", "미디어 플래닝과 소비자 분석 참고."),
  site("나스미디어", "https://www.nasmedia.co.kr/%EB%82%98%EC%8A%A4%EB%A6%AC%ED%8F%AC%ED%8A%B8/%EC%A0%95%EA%B8%B0%EB%B3%B4%EA%B3%A0%EC%84%9C/", "인사이트·트렌드 리서치", "업종별 디지털 광고 인사이트와 정기 보고서를 제공합니다.", "광고 시장 흐름과 업종별 벤치마크 확인."),
  site("메타광고 라이브러리", "https://www.facebook.com/ads/library/?active_status=all&ad_type=political_and_issue_ads&country=KR&is_targeted_country=false&media_type=all", "인사이트·트렌드 리서치", "Meta 광고 라이브러리에서 광고 소재를 확인합니다.", "노션 페이지의 광고 레퍼런스 링크입니다."),
  site("애즈오브월드", "https://www.adsoftheworld.com/?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "글로벌 캠페인과 광고 크리에이티브 사례를 모아보는 사이트입니다.", "노션에는 왓애즈/애즈오브월드 항목으로 정리되어 있었습니다."),
  site("카피가 강한 세상에", "http://www.adim21.co.kr/?ref=ko-blog.smore.im", "인사이트·트렌드 리서치", "카피라이팅 아이디어를 얻기 위한 광고 카피 참고 사이트입니다.", "카피라이팅 아이디어 섹션에서 가져온 링크입니다."),
];

const instagramSites = [
  {
    "name": "Instagram Reference",
    "url": "https://www.instagram.com/p/DPlfPYAAW0g/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc778\uc2a4\ud0c0REF",
    "description": "\uc778\uc2a4\ud0c0\uadf8\ub7a8\uc5d0\uc11c \uc2a4\ud06c\ub7a9\ud55c \ucf58\ud150\uce20 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ud589\ubcf5\ud55c \ud559\uad50 \uc77c\uc0c1 | \ud589\ubcf5\ud559\uad50",
    "url": "https://www.instagram.com/p/DPsWHIPCWJi/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc778\uc2a4\ud0c0REF",
    "description": "\ud559\uad50 \uae09\uc2dd\uc758 \uba5c\ub860 \uc528\uc557\uc744 \uc2ec\uc5c8\uc2b5\ub2c8\ub2e4. \ud604\uc7ac \uba5c\ub860\uc774 8\ud1b5\uc774\ub098 \uc608\uc058\uac8c \uc5f4\ub838\uc2b5\ub2c8\ub2e4. \uc544\uc9c1 \ub124\ud2b8 \ud615\uc131\uae4c\uc9c0\ub294 \uc548\ub418\uc5c8\ub294\ub370\uc694. \uc798 \uc790\ub784 \uc218 \uc788\ub3c4\ub85d \uc751\uc6d0\ud574\uc8fc\uc138\uc694.\ud83d\ude06 \ud589\ubcf5\ud559\uad50, \uc778\uc77c\uc5ec\uace0\ud83d\ude04",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-15/564203160_17869436499450629_5514119087944341226_n.jpg?stp=dst-jpg_e15_p480x480_tt6&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=105&_nc_oc=Q6cZ2QEHJnd76TA5s64Wn9PtHm6FAGNJdloAdPAvriila3LmxvQVDWjYYc4MtBxIIZK7_zg&_nc_ohc=esdbFK1Rbr8Q7kNvwG0qMCX&_nc_gid=wsccLWtlr9XXxEKWx-LxHw&edm=AMO9-JQAAAAA&ccb=7-5&oh=00_AfdT2DZ4PXviywN1yi981LG5Ih6O17YObH7ZrCdjWz6m0w&oe=68FB6964&_nc_sid=cc8940",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc18c\uc0c1\uc790 | \uc870\uba85\ube0c\ub79c\ub4dc&\ub514\uc790\uc774\ub108",
    "url": "https://www.instagram.com/p/DOBNBRzEk5k/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc778\uc2a4\ud0c0REF",
    "description": "\ud83d\udca1100\uc77c\uc548\uc5d0 \uc870\uba85\ube0c\ub79c\ub4dc \ub3c4\uc804 24\uc77c\ucc28 \uc250\uc774\ub4dc \uc120\ucd9c\uc2dc\uae4c\uc9c0\ub294 \uc0ac\uc9c4\ucd2c\uc601\ub9cc \ub0a8\uc558\uc2b5\ub2c8\ub2e4!!@ \ubc14\uc058\ub2e4\ubc14\ube60 \ud604\ub300\uc0ac\ud68c #100\uc77c\ucc4c\ub9b0\uc9c0 #\uc870\uba85\ube0c\ub79c\ub4dc #\ub8e8\uba54\ub098m3 #\uc250\uc774\ub4dc #\uc778\ud14c\ub9ac\uc5b4\uc870\uba85 #3D\ud504\ub9b0\ud130",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/541850795_17851154493538336_6121722660614970871_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2QFf2PSt73vbUVRn3YY7X46cQDpIyEtJXJ8Vorpm69gIvjWLw-ALNXH0nD7epxYuRsM&_nc_ohc=FfzVracHYAMQ7kNvwHjL7MS&_nc_gid=m_PQ5eTW6EEDAuECh4i4Zw&edm=AMO9-JQAAAAA&ccb=7-5&oh=00_AfeNdVZ06egTk3QP0NoUDNN6wLMS2ChPNsoZ4Y0FtOZtIA&oe=68FB56CA&_nc_sid=cc8940",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc694\ub9ac\uc5d0 \uc9c4\uc2ec\uc778 \ud3b8",
    "url": "https://www.instagram.com/p/DPeWmrHk-PE/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc778\uc2a4\ud0c0REF",
    "description": "#\ud30c\uc2a4\ud0c0\ub3c4\uc804\uae30",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-15/561307628_1169194788477521_4973534879944144147_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=105&_nc_oc=Q6cZ2QG5U2QzXvJYDWznkG0giOtRnk8QNLU_ywHvVHI7ghdcNvZ-1ivOxpTyOwh_gz1VLzE&_nc_ohc=c-NZOjBPKUsQ7kNvwEAiLbs&_nc_gid=YND_XI7D7HT8jtAyKY0h8A&edm=AMO9-JQAAAAA&ccb=7-5&oh=00_AfcBiSo2bdU_MNpNTYi5cRwFrJ9sU1xUJimBjmdhkW1Ycg&oe=68FB51FA&_nc_sid=cc8940",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uae40\ubcf4 l \uc18c\uc2dc\uc9c0\uc544\uc870\uc2dc",
    "url": "https://www.instagram.com/p/DPkCn_IkxMV/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc778\uc2a4\ud0c0REF",
    "description": "#\uc18c\uc2dc\uc9c0\ub3c4\uc804\uae30 79\uc77c\ucc28 \ucd95\uc81c \ud31d\uc5c5\uc5d0\uc11c \uc18c\uc2dc\uc9c0 3\ucc9c\uac1c\ub97c \ud314\uc544\ubcf4\uc790",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-15/564427207_17984202485859876_6794472150982243244_n.jpg?stp=dst-jpg_e15_p640x640_tt6&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QHWPu3hY11dTbrPy5CsF_M33e8gjK_727Q---zXIUIJZYPAV8td8idH97m3GtgVMwY&_nc_ohc=yKSmruIhwlUQ7kNvwEQyLmK&_nc_gid=3TAGM6GpLbFJv44twXqRrA&edm=AMO9-JQAAAAA&ccb=7-5&oh=00_AfdUzEDRRuWEPvg5R1NAftq3rQam1DKPB3AkeHqklIq6Cg&oe=68FB4CE5&_nc_sid=cc8940",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ub300\uc131\ucd95\uc0b0\ud83e\udd69 | \ub300\uc131\uacf1 | \uc628\ub77c\uc778 \uc815\uc721\uc810 | \uc2e4\ud328 \uc5c6\ub294 \uace0\uae30 \ub9db\uc9d1 | \uc7a5\ud615\uc8fc (@daesungmeat_jang) \u2022 Instagram profile",
    "url": "https://www.instagram.com/daesungmeat_jang/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud310\ub9e4",
    "description": "@daesungmeat_jang \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/359145970_797227148540315_465052167313296452_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=105&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=vg6ht2nAaEIQ7kNvwEQlElk&_nc_oc=AdkZRq8i5_s_Kb3Fkpn-R__eaA5X_gtvDGzegptViU23HJUzW3XQOY43b7tJuuiacu8&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&oh=00_AfmAwvWXoc_kcJtebcOuHOLaeeYB74yeVo4Mn9vBJLWYiA&oe=693C1014",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "_\u1103\u1165\u1103\u1161\u11af\u1103\u1161\u11bc (@the_daldang) \u2022 Instagram profile",
    "url": "https://www.instagram.com/the_daldang/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud310\ub9e4",
    "description": "@the_daldang \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-19/525274581_18230819521292079_8507850085522643410_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=105&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy41NTAuQzMifQ%3D%3D&_nc_ohc=HhQrX5sXYhEQ7kNvwE78wH0&_nc_oc=AdlvMEMB2SslKQKVWfrv7HesWsaWz6bVVpD4kL7gYu7vC9cDHe3Y44JyEto71MTg44A&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=tzDO62na12OOg4MqOHyA3A&oh=00_AfmIZRL-T78k1O34JFJsvu5e54oVV9su3dpyMvqqKEC3bA&oe=695156BC",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "@uzzi_nemmm",
    "url": "https://www.instagram.com/uzzi_nemmm/reels/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc694\ub9ac\uacc4\uc815",
    "description": "@uzzi_nemmm \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uacbd\uc8fc \ubc8c\uafc0\uc624\uc18c\ub9ac",
    "url": "https://www.instagram.com/p/DPvmK5rEywE/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\uc158/\ub3c4\uc804",
    "description": "\ub300\ud45c\ub2d8 \ucc28 \uc870\uae08\uc529 \ubd80\uc218\uae30 #\uc5f0\ud734\ub05d #1\uc77c\ucc28",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/564054939_640686609094150_8891634381547250802_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=110&_nc_oc=Q6cZ2QErhBiUJVYpLc5EVw5J3bvo2vA-he0GgK7I9mlFJtcCckyJuzPx4U2E4jvEJzghc0Q&_nc_ohc=Py03Lf2M3gQQ7kNvwHxVVPB&_nc_gid=MO_NG5B6Ofp4rWzk4t_R_g&edm=AMO9-JQAAAAA&ccb=7-5&oh=00_Afc3jlmB4kq8OtStd3y2v1zphL-MDYlD_hhKTEyJKN5l_g&oe=68FB64A9&_nc_sid=cc8940",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc11c\ud3c9\uc9c1 l \uc11c\uc6b8\uc758 \ud3c9\ubc94\ud55c \uc9c1\uc7a5\uc778 (@seopyeongjik) \u2022 Instagram profile",
    "url": "https://www.instagram.com/seopyeongjik/reels/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\uc158/\ub3c4\uc804",
    "description": "@seopyeongjik \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.75761-19/496718304_17945334956992170_571181902964898002_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=111&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy44MDAuQzMifQ%3D%3D&_nc_ohc=u5uVavZKRvwQ7kNvwE8S2qz&_nc_oc=AdneZ4OVebOmE_KO7kzJ6WfPqIeHbNOHbekIfXHtqhhjL9PpdUqfNO5c0glyWHognPo&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=J2jNIbzPCyr015I-X5AJ0Q&oh=00_AfcG6z_bshOfJIWOsV2bsGYLMmtCEUP08Wg9AY8RF53VNA&oe=68FE6F80",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc694\uc998\ubb50\ud558\uace0\uc0ac\ub2c8? (@yojeummwohagosani) \u2022 Instagram profile",
    "url": "https://www.instagram.com/yojeummwohagosani/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\uc158/\ub3c4\uc804",
    "description": "@yojeummwohagosani \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.75761-19/499927818_17847168999473857_3884606487170075680_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy42OTcuQzMifQ%3D%3D&_nc_ohc=nJJAILzSV80Q7kNvwG_PRmr&_nc_oc=AdkA2glnBNhxTZvCBGVY0kH9kDPoLMOvniejH2-VBkod3j_6zhnaLE6WutHTpPKKWw8&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=SjS2S-A0P9ZRWR94VWyTxw&oh=00_AfkpNLs_mxYS1s7DK4IU1FP_j-PfdguiPTtP4mLDmVgTAQ&oe=69514CEB",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc2f8\ud074 (@silence_clean) \u2022 Instagram profile",
    "url": "https://www.instagram.com/silence_clean/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\uc158/\ub3c4\uc804",
    "description": "@silence_clean \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.82787-19/589152469_17842339995649532_3117436030800031861_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy43MDMuQzMifQ%3D%3D&_nc_ohc=gULTTZfq4i4Q7kNvwHKB0zq&_nc_oc=AdmzlBXhqB9j6YdIUuiGd7Zz8KBAbSOP8EJUzKBIw4ncC0JS6ZK75ZujwixoJofWUwA&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_gid=3xs9phNCLyXZlCnIJeYaEw&oh=00_AfphvMcAd4AnqxWuebz4VcU54fBZLr_JGo5nJuTgTxJriQ&oe=6963DF2F",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uccad\uc18c\ud558\ub294\uc0ac\ub78c (@1trash1follow) \u2022 Instagram profile",
    "url": "https://www.instagram.com/1trash1follow/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\uc158/\ub3c4\uc804",
    "description": "@1trash1follow \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/488949837_1873377906764823_2257678271567695869_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDI0LkMzIn0%3D&_nc_ohc=-ng_sOqQyg4Q7kNvwHja92W&_nc_oc=Adl5FdZuw719ySPqW4sB03QI0Jjh4A7aueVNaacJTYTKRmALpXp81Yoj3GfIR_Jlp-Q&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_Afmhn-yj4nib4tEuPTOWTCWRhkKa2bo8TgjoQJTQUIMREg&oe=69358647",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc694\ub9ac\ub85c \ub2e4\uc2dc \uc2dc\uc791 | \uc694\ub2e4\uc2dc (@againchef) \u2022 Instagram profile",
    "url": "https://www.instagram.com/againchef/reels/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ucf58\ud150\uce20 \uc544\uc774\ub514\uc5b4 \ucc38\uace0",
    "description": "@againchef \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-19/522737387_17848514793521988_3525481570346028033_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDI0LkMzIn0%3D&_nc_ohc=w8eEpAa5iBYQ7kNvwGuQd2X&_nc_oc=AdkaSdFnUrjnribb8npl0J3cl6RAqEoUwT7wFQyMvueFAgNZG0FdSxfpKqWoy9BIdJs&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=2Uny3a956MBhCKxfHEyRsg&oh=00_Afjr4Mgw4-Mk6O3esIDPcIkknlDwMY1qpprfkm6p9ObKmA&oe=6911B1BC",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc5d0\uadf8\ub9e8 (@egg.man1996) \u2022 Instagram profile",
    "url": "https://www.instagram.com/egg.man1996/reels/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ucf58\ud150\uce20 \uc544\uc774\ub514\uc5b4 \ucc38\uace0",
    "description": "@egg.man1996 \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/475091148_2201425763586172_6600163434246812673_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=104&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=ziC3RrNvU4IQ7kNvwEgbxPo&_nc_oc=AdmBoEJXCwWmNpcRepvSdfYa6zp5wuWi6TB4cG2rqrxtlypIXCuBs0UP1b_B-AKpAyw&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_Afi0uE9EPFTUJ5NO55BPlKkC4Jcra2L1qUyPAbwXbwjrQw&oe=6911CE5B",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "@zerob_0b",
    "url": "https://www.instagram.com/zerob_0b/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ucf58\ud150\uce20 \uc544\uc774\ub514\uc5b4 \ucc38\uace0",
    "description": "@zerob_0b \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "@bababa_sak",
    "url": "https://www.instagram.com/bababa_sak/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ucf58\ud150\uce20 \uc544\uc774\ub514\uc5b4 \ucc38\uace0",
    "description": "@bababa_sak \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uae40\uc885\uad6c (@bellnine59)",
    "url": "https://www.instagram.com/bellnine59/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ucf58\ud150\uce20 \uc544\uc774\ub514\uc5b4 \ucc38\uace0",
    "description": "@bellnine59 \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/566198034_17843550336597910_6463693780596435091_n.jpg?stp=dst-jpg_s240x240_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=1&_nc_oc=Q6cZ2QEfjynxH8kiGhwgt4ERDRXpe7Z1aRfabZXeWWSAcV9cr0mAESWg_lwdYBy-Wkmb9lU&_nc_ohc=GbB0zlVtP_YQ7kNvwFc6EsM&_nc_gid=PSOZEBiIDIT_vu7nnV0zxQ&edm=AMO9-JQAAAAA&ccb=7-5&oh=00_AfcY7pxZIZq0vf9TQKe9A3WhbLZx6hngLnkJtzv9zCPIEQ&oe=6904731E&_nc_sid=cc8940",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uadf8\ub85c\ube0c\uc13c\ud2b8 (@grove_scent) \u2022 Instagram profile",
    "url": "https://www.instagram.com/grove_scent/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ucf58\ud150\uce20 \uc544\uc774\ub514\uc5b4 \ucc38\uace0",
    "description": "@grove_scent \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.82787-19/528850330_17846473776539836_2019362694388453975_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=110&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy45OTIuQzMifQ%3D%3D&_nc_ohc=i4IKy59HiOMQ7kNvwF89fDn&_nc_oc=AdmbP1On0Ik5sJ28wk2CUKjzWavOvldu5BXhSrdgTs6muW7GmbcWKIF05MhViJY82ow&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_gid=P-NjXCFiSe35O8LGXOTcdw&oh=00_Afgt9HL-5UL6kx395iU_VMJj1hXbKJoNqvsLh3G-ol2eNw&oe=691CC878",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "Erik Schmitt (@erik__schmitt) \u2022 Instagram profile",
    "url": "https://www.instagram.com/erik__schmitt/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ucf58\ud150\uce20 \uc544\uc774\ub514\uc5b4 \ucc38\uace0",
    "description": "@erik__schmitt \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-19/552175481_18530319121044269_9125470340656920626_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDc3LkMzIn0%3D&_nc_ohc=JIvM4RcNPUQQ7kNvwF4kQkU&_nc_oc=AdmpCTus30-Y5kTiyFsqtYDv1n9S4HmDCqOYVmkLBgjD89CeF3BzMPgl99kkCGg8Ig4&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=VcSOKtj_AIU91rDsLsn4fg&oh=00_AfgkI-D68SPPLj9gVwmETumt2_XVaJNGSMfChQP133weyw&oe=69205550",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "https://www.instagram.com/jokingmono/reels/",
    "url": "https://www.instagram.com/jokingmono/reels/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ucf58\ud150\uce20 \uc544\uc774\ub514\uc5b4 \ucc38\uace0",
    "description": "@jokingmono \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ub098\ub294\uc57c \ubc41\uc0c8 (@cute.but.fast) \u2022 Instagram profile",
    "url": "https://www.instagram.com/cute.but.fast/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud2b8\ub80c\ub4dc\ubaa8\uc74c",
    "description": "@cute.but.fast \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-19/586232452_17905220286293350_8395095798321284353_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=106&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy40NjMuQzMifQ%3D%3D&_nc_ohc=hXFJhrRrYbYQ7kNvwE5-rXN&_nc_oc=Adn30q0v9Vkji8xsd5HNoDoEuVv38wK1qBuKzqw3uLOCdpG4ZchDoT36wovp20QZAsQ&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=yWa3gYFzo4j-h8YH1pbdBA&oh=00_AfmskrMkkmgDgyErDbX_R0YZa50UkRG6rN4QHHvB75PHbA&oe=693690D4",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc774\uc288&\ud2b8\ub80c\ub4dc | \ucf00\ucc39 (@ccatch_upp) \u2022 Instagram profile",
    "url": "https://www.instagram.com/ccatch_upp/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud2b8\ub80c\ub4dc\ubaa8\uc74c",
    "description": "@ccatch_upp \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/491444269_1204223324410263_3635939856204562413_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=HGV8jfFl1bgQ7kNvwFOEtOM&_nc_oc=AdmBpP6_RM4DCQqanQlMJBWRwLkjwF78_GMa-bKtMlliaCPUuaPkUoAgIwvFsnaK8y8&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_AfmlkZBAUJi_mU0gjTAmXFT-dCbsrDVq2xp1nYGRgrzcjA&oe=6936ABC1",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "Knewnew \ub274\ub274\ub9e4\uac70\uc9c4 (@knewnew.official) \u2022 Instagram profile",
    "url": "https://www.instagram.com/knewnew.official/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc77c\uc0c1_\ucde8\ud5a5\ub9e4\uac70\uc9c4",
    "description": "@knewnew.official \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/471570006_1159407405605222_8248327761437356302_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDAwLkMzIn0%3D&_nc_ohc=ZzdaovkShGIQ7kNvwF2aGUp&_nc_oc=AdmEWtzcmflWDcEy7VH_aJ3KJpJfQKsvj1TcnvGyS3X0wV5gV5i_Rbep6bvxODea65U&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_AfmmW-lsBBISMJxfmYYhkPyn2C9O4gVTY6lqWMMwqyFXrA&oe=6935764C",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "BAR.SAN (@bar.san.chiangmai) \u2022 Instagram profile",
    "url": "https://www.instagram.com/bar.san.chiangmai/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc0ac\uc9c4/ \ub514\uc790\uc778 \uc88b\uc740 \ube0c\ub79c\ub4dc",
    "description": "@bar.san.chiangmai \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "goodhaus (@goodhaus.bkk) \u2022 Instagram profile",
    "url": "https://www.instagram.com/goodhaus.bkk/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc0ac\uc9c4/ \ub514\uc790\uc778 \uc88b\uc740 \ube0c\ub79c\ub4dc",
    "description": "@goodhaus.bkk \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/275867399_370272098308822_3048810613651371205_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDAyLkMzIn0%3D&_nc_ohc=MJz9dAodq8kQ7kNvwFuwV7y&_nc_oc=AdndAhyy5RvCPrtmCVEMXej3peGhHTwUQRxL6AME3pPpklJyXWIjKfkhMHh-PRpoEWg&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&oh=00_Afm9gFj6bgy2ivuRQ10PyYzNgLI_RyB0DoQOdXVnFsp_kw&oe=6936BA85",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc0e8\ub760 (@shantifyy) \u2022 Instagram profile",
    "url": "https://www.instagram.com/shantifyy/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc74c\uc545\ub514\uae45",
    "description": "@shantifyy \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc9c4\uc9dc \uce75\ud14c\uc77c \uc0c8\uc6b0 \ub808\uc2dc\ud53c \u3163 \uc644\ubcbd\ud55c \uc0c8\uc6b0\uce75\ud14c\uc77c \ub9cc\ub4dc\ub294 \ubc95",
    "url": "https://www.instagram.com/the_prokitchen/\\n\uc5d0\ub9ad",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uafc0\ud301",
    "description": "@the_prokitchen \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://i.ytimg.com/vi/F1NSMaUK9mk/maxresdefault.jpg",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc9c4\uc9dc \uce75\ud14c\uc77c \uc0c8\uc6b0 \ub808\uc2dc\ud53c \u3163 \uc644\ubcbd\ud55c \uc0c8\uc6b0\uce75\ud14c\uc77c \ub9cc\ub4dc\ub294 \ubc95",
    "url": "https://www.instagram.com/fire_all_tables/\\n\\nSubscribe",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uafc0\ud301",
    "description": "@fire_all_tables \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://i.ytimg.com/vi/F1NSMaUK9mk/maxresdefault.jpg",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "Zai \u2022 Oishi Mate (@oishimate) \u2022 Instagram profile",
    "url": "https://www.instagram.com/oishimate/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc694\ub9ac \uc778\ud50c\ub8e8\uc5b8\uc11c",
    "description": "@oishimate \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/459102306_1648934549172403_1712360390257191271_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=MIcHuvU5J8IQ7kNvwEJvc6J&_nc_oc=AdlwFpNGjVFlVvW6-35mjML7T3EDeH1oYBnUKyrHr8lVewEmmr2kfgTJc5bW8NF7Cag&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&oh=00_Afn4U74IVL3vWgdI7VypHXoVQ5OrXo4prUvRqZSWBySwSA&oe=6936B5E5",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc774\uacbd\uc9c4 / \uc9c0\ub2c8\ud3ec\ucc28\ud83d\udccd (@jini___202) \u2022 Instagram profile",
    "url": "https://www.instagram.com/jini___202/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc694\ub9ac \uc778\ud50c\ub8e8\uc5b8\uc11c",
    "description": "@jini___202 \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/410376073_215839814895536_8353101968357667386_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=107&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=ECg1ve3AHvkQ7kNvwEuvswg&_nc_oc=AdnXxLgtXAp2KKoqxpqM-eDKI6q3u_TcpIgyoKpymFqJaN3J5a2vAY5oVQ_WFr3xNC8&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_AfltWxIHti4DTq8QYN-lX6lOhyQgHeGhFA1bGluMNFYQHw&oe=6938036E",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "Aidan Galassetti",
    "url": "https://www.instagram.com/reel/DQ4q7ArFMYa/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ub808\ud37c\ub7f0\uc2a4",
    "description": "morning recipe \u2615 song - 'Assaji' by @jumadiba_assaji camera - @sonyalpha a7IV lens - @tamronamericas 2.8 28-70mm ND - @freewellpro",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-15/584398833_18535492948027150_5503102851750436471_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=tasFFljjeY4Q7kNvwHLKV_N&_nc_oc=AdlKc_q6sxpqX1bW7oFZTyeY9IgsgHDiH7mIc_FDO1AXADItk56VuRsal993ymdF_W4&_nc_zt=23&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=brpuHq0CjyVle2lmn8Y4aQ&oh=00_Afm6XfJUUamiuSif9OX0CdNux2gJ0Uaxl0GJjn83bsvgWg&oe=6936CCBF",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "QUINN",
    "url": "https://www.instagram.com/p/DQ_vDiPkuvQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ub808\ud37c\ub7f0\uc2a4",
    "description": "\u2b51.\u141f (\u0e51\u1d54\u2919\u1d54\u0e51) oishiii!!!!",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-15/580918914_18546766666049828_8948574445633931181_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=8sK1xV1S7SoQ7kNvwE6aaFL&_nc_oc=Adn513N3BDpsqLdC5tJr29a0Dw1QxHLOppa705ATRCXgCc11vnKbne-lGv86XA9iv98&_nc_zt=23&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=p00ySPC-7ffgF83Zvtny2A&oh=00_AfkqiYN7TUddrLR0MtkThZFLMTMXjf7dP_9A5BTNcT2__A&oe=6936C714",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "@zumi_zumi232) \u2022 Instagram profile",
    "url": "https://www.instagram.com/zumi_zumi232/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc77c\ub7ec\uc2a4\ud2b8/\uce90\ub9ad\ud130",
    "description": "@zumi_zumi232 \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/472257418_565963116317583_6233945285004748145_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=110&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=DwcM7j9MlCEQ7kNvwFh9nmu&_nc_oc=Adm-zN9TF006S22AgRYkEofe50c9fNMeoQ-jVT8qD1hZym6yiHDsjglAKRmlvLZEU-g&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_AflZhh-8v0bETzQRSgVbsXmT0pv5o1V8bNKRxPzAHwz_4w&oe=6936B329",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "TUKATA\u00ae (@tukata.kr) \u2022 Instagram profile",
    "url": "https://www.instagram.com/tukata.kr/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc77c\ub7ec\uc2a4\ud2b8/\uce90\ub9ad\ud130",
    "description": "@tukata.kr \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "VICTOR (@vicver) \u2022 Instagram profile",
    "url": "https://www.instagram.com/vicver/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc601\uc0c1/\ud3b8\uc9d1",
    "description": "@vicver \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/275107345_6987515841318667_4154223064674578709_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy45MDAuQzMifQ%3D%3D&_nc_ohc=T88vqSXsRwkQ7kNvwFs4OHG&_nc_oc=AdkZn-G25Ts867WiyyxWhzmSIhr0XfX25ThUgfF3r2vhISBM6BSMPstbiOLVbqAbnoc&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&oh=00_AfmKu1cp2QoUwde5eikYOnIwR547u9kquf3g_pou5xYVUg&oe=6936AD20",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "KKINI (@studio.kkini) \u2022 Instagram profile",
    "url": "https://www.instagram.com/studio.kkini/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc601\uc0c1/\ud3b8\uc9d1",
    "description": "@studio.kkini \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/240738565_890821804863134_438261835794880892_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=101&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=lRdUkpG_bicQ7kNvwHnsgs9&_nc_oc=Adk6Xgeh4Iup22P55d83bhCjkcuNlqot6bz2a9D9fV41SOoM7VFtkFbxDkwQtypzoSA&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_AfnRstsfnAHywa99gycq6yThFTKYzEURmJ66BKLU1zEhJg&oe=6936B6A3",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "KNOCK \ub178\ud06c (@archiveknock) \u2022 Instagram profile",
    "url": "https://www.instagram.com/archiveknock/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc601\uc0c1/\ud3b8\uc9d1",
    "description": "@archiveknock \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "halooo, aku Suci! \u2728 (@dwslestari) \u2022 Instagram profile",
    "url": "https://www.instagram.com/dwslestari/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc601\uc0c1/\ud3b8\uc9d1",
    "description": "@dwslestari \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.82787-19/551113402_18532741993059660_1044478152072857338_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=108&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=2H_4zl8GKjkQ7kNvwFq6gU7&_nc_oc=Adk3g8s7K7eNv5vfqhUPRMlVkjDpLG8YLRUTfYzy3fnqUmoXOLap2Ch-tMRSJpbVJks&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_gid=EqIzkrgHHKMih854KYrVog&oh=00_Afnt2s7zqyn3nwQKfLtDwdZ1bqXTqJotAZEY_NQkGZ4Vhw&oe=69516A36",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ucef4\ubc14\uc778 COMBINE (@cbi.busan) \u2022 Instagram profile",
    "url": "https://www.instagram.com/cbi.busan/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubd80\uc0b0 \ub514\uae45",
    "description": "@cbi.busan \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/416446786_1324195168299078_9221229727997646657_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=107&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=tujSFxJ5W3YQ7kNvwHIp0LJ&_nc_oc=AdmWK3sJLGXnsIjUvIPJ_cfR7NjN_kHpwiD4wEdL9OGlgIhyXvG9l488KQgXxxY803k&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_Afkx9d_BhKeE8bCRxh7Rei1GYye47ymvbvULjbWqqQjEbA&oe=6936C430",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "Maya Golyshkina (@_themaiy_) \u2022 Instagram profile",
    "url": "https://www.instagram.com/_themaiy_/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud574\uc678 _ \uc778\ud50c\ub8e8\uc5b8\uc11c",
    "description": "@_themaiy_ \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "kenny song (@kennylsong) \u2022 Instagram profile",
    "url": "https://www.instagram.com/kennylsong/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud574\uc678 _ \uc778\ud50c\ub8e8\uc5b8\uc11c",
    "description": "@kennylsong \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/469591723_928140662634086_4129035000864235563_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=tsLJjaruMlYQ7kNvwGdlclc&_nc_oc=AdmMmTQRFW6H4YJJj-l9SbWRH5VinA93Wrqxw-avBxiKMRX9pXfDqaufay2xGweJ62k&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&oh=00_Afl31h9D559660JZ3A-BHzOUWzWNBIPj90ZcsjVDawJFJw&oe=6936A966",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "The Pantry Boy (@thepantryboy) \u2022 Instagram profile",
    "url": "https://www.instagram.com/thepantryboy/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud574\uc678 _ \uc778\ud50c\ub8e8\uc5b8\uc11c",
    "description": "@thepantryboy \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/249456587_4494223820696356_5749646918674872141_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=106&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy43NjguQzMifQ%3D%3D&_nc_ohc=oJAvPLRHOYgQ7kNvwE-JQDC&_nc_oc=AdlPM86M_HRfROCxTYihdIxTn5FeNE1X-XEFb_2oWp9sEEdRK9d1iyKVv8v9q71szXg&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&oh=00_AfrJlw6NyONh2oZr2R6IGQBCySNNvMLkkEjBO8a0yPYEyQ&oe=696531DC",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "uvres sensibles, Sarah Espeute (@sarahespeute) \u2022 Instagram profile",
    "url": "https://www.instagram.com/sarahespeute/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud574\uc678 _ \uc778\ud50c\ub8e8\uc5b8\uc11c",
    "description": "@sarahespeute \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/453770603_498753979368324_7542512012848644222_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=102&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=z2HadaS0r_4Q7kNvwH-r--b&_nc_oc=AdkbPJgxfSx0KUZqrB-Anya18RtGUNRGd1N5RsIGHWiyU4EN77d-QPU05x54Y8WxO0A&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_AfnQaq4i76WH5Ia2jYVne1BMkg6iBxkTobNeVxr6PBOGcA&oe=6936CB01",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "Valerie Zhang (@valslooks) \u2022 Instagram profile",
    "url": "https://www.instagram.com/valslooks/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud574\uc678 _ \uc778\ud50c\ub8e8\uc5b8\uc11c",
    "description": "@valslooks \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-19/567126470_18083670053511187_4776441015838167924_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=CHbnPFANyloQ7kNvwE1a9Rp&_nc_oc=Adm-qHpFpicGioaAhPzlO4-k5YCprBPXOo_dYUqn7AZUFB9n39fPOKL5sekvJw5F1cE&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=j_KCiRcihgLHHTkdeST7GA&oh=00_AfmiEbm3pBO-v6ZjB9OWszOSHkZg-aUDLgk_SRPXWcFPXg&oe=6936C8CE",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "Instagram\u2019s @Creators",
    "url": "https://www.instagram.com/p/DSA_JnPEdRA/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ud574\uc678 _ \uc778\ud50c\ub8e8\uc5b8\uc11c",
    "description": "Who knew that chess could change lives? Streamer, content creator, and chessman grandmaster @nemochess began her content career th",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-15/591152559_18252579187291405_5311302421811557008_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzIifQ%3D%3D&_nc_ohc=4MUZhFQVYXQQ7kNvwGeT7iz&_nc_oc=AdnE3gM40pQE5ITkc0yqlUiSf3R0tXpbZbZUgFMG_lB9N1bxbaCs3XkkUbldursx4IY&_nc_zt=23&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=NlW2uBef3Bg00LwA3GAXVg&oh=00_Afl6NuY0MBaPl69uINZAAO6eTR7sBpB1X86pTcF4UyNTjA&oe=695077EA",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ud2b8\ub80c\ub4dc\ud3ec\ud138 (@trend__portal) \u2022 Instagram profile",
    "url": "https://www.instagram.com/trend__portal/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc601\uac10/\ub9c8\ucf00\ud305\uc790\ub8cc",
    "description": "@trend__portal \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ube44\uc2a4\ud0b7 | \ub9c8\ucf00\ud305\u30fb\ube0c\ub79c\ub529\u30fb\ud06c\ub9ac\uc5d0\uc774\ud2f0\ube0c (@biscit.co.kr) \u2022 Instagram profile",
    "url": "https://www.instagram.com/biscit.co.kr/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc601\uac10/\ub9c8\ucf00\ud305\uc790\ub8cc",
    "description": "@biscit.co.kr \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc11c\ube0c\uc81d\ud2b8 | \uc0ac\ubd80\uc791\ud2b8 (@subject.co.kr) \u2022 Instagram profile",
    "url": "https://www.instagram.com/subject.co.kr/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc7ac\ub2a5",
    "description": "@subject.co.kr \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/446865398_2262069867494715_5632576786648110504_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=111&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=LsrXluQ6zzcQ7kNvwEUmjLG&_nc_oc=AdlvfrXNgfhC_oLhi2qXpkViol4e6uVkQrJCbsuscZU4KiBQzH2PSICF_X0ujA2Qmr8&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&oh=00_AfkIHWhiaYIR1rp5YmvFf3X7r595HtGKG7QsbCioVNHW9A&oe=6936BA8E",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ucef5\uc624\ube0c\ud2f0 \ub9e4\uac70\uc9c4 (@cupoftea_mag) \u2022 Instagram profile",
    "url": "https://www.instagram.com/cupoftea_mag?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@cupoftea_mag \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-19/573914225_17930262324125463_6166060594879006748_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=pVTBELttmp0Q7kNvwHoE_wh&_nc_oc=AdlsBriBZxaYWFVY8UNYsoMB2sdzguK-UP3yxco5DesxgG2Q-gCSnC8SSBvJGnSNjMs&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_gid=wfcTRhnGHyJRKMkwkou4rg&oh=00_AfgZfmcpUuFvR3Gx6lBLJI47a1XwfR-b0upbkAdBscW_xQ&oe=69204A4E",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "BAO magazine (@magazinebao) \u2022 Instagram profile",
    "url": "https://www.instagram.com/magazinebao?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@magazinebao \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/473146186_1515077522520282_1726818486739658977_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=107&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy45ODguQzMifQ%3D%3D&_nc_ohc=GmnPBb19aycQ7kNvwHjk8Fo&_nc_oc=Adm_e_oh9IdwuQCTnwh-5lhRP76Jg2N_S0H_v3rjirfugEACJIlyuLdq-2AkDCx-swA&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_AfhXW7WTVYm0tuuZbOyXfRVV_1nNUEEWdzV7RGRO_n6B_w&oe=69206A31",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc2dc\uc57c \ub9e4\uac70\uc9c4 (@seeya_magazine) \u2022 Instagram profile",
    "url": "https://www.instagram.com/seeya_magazine?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@seeya_magazine \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/444488105_794355789462866_800396713568192477_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=111&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=KMek_d1HOfUQ7kNvwEqxcLw&_nc_oc=AdlN2HStllXOx4o-SIB9WDBynCpD4U4cm7vj_kg6UdopAMmob6SFL2J4q2k0lneRHKM&_nc_zt=24&_nc_ht=scontent-iad3-2.cdninstagram.com&oh=00_AfjfZ07et2YqLyaSnWVlkYEsXtRjxid123Zg4HenVERNvw&oe=6920680A",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ube44\ucf70\uc774\uc5c7 \ub9e4\uac70\uc9c4 (@bq.mag) \u2022 Instagram profile",
    "url": "https://www.instagram.com/bq.mag?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@bq.mag \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/425380612_352391034382420_632862893538022851_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=110&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDE3LkMzIn0%3D&_nc_ohc=rvabCazzw8IQ7kNvwGBm1c1&_nc_oc=Adn8MoNFGzc95yPUgnT5j_V-YY_gN7cMesnFVVS3dhqUJzseijdeYz7QRvzpTVQSdlE&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_Afg-vUpvvo5mnjj4SZfiFlJ2VtY0MZBuscyLfmjNmuxKKQ&oe=69206F4C",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc0dd\ub9e5 _ \uc194\uc9c1\ud55c \uc0dd(\u751f)\uacfc \uc77c\uc0c1\uc758 \uc774\uc57c\uae30\ub97c \ub2e4\ub8e8\ub294 \ub9e4\uac70\uc9c4\uc785\ub2c8\ub2e4. \u2018\uc0dd\ub9e5\u2019\uc774\ub77c\ub294 \uc774\ub984\uc5d0\uc11c \ubcfc \uc218 \uc788\ub4ef\uc774 \ub9e5\uc8fc\uc9d1\uc744 \ucf58\uc149\ud2b8\ub85c \ud558\uc5ec \ub9e4\uc8fc \uc6d4, \uc218, \uae08 unripe(\uc775\uc9c0 \uc54a\uc740), raw(\uac00\uacf5\ud558\uc9c0 \uc54a\uc740), live(\uc0b4\uc544 \uc788\ub294) \uba54\ub274\uc758 \ud14c\ub9c8\ub85c \ucf58\ud150\uce20\ub97c \uc5c5\ub85c\ub4dc",
    "url": "https://www.instagram.com/saengmag?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@saengmag \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ube75\ubaa8\ub2dd\uc740 \ube75\uc744 \uc0ac\ub791\ud558\ub294 \uc0ac\ub78c\ub4e4\uc774 \ubaa8\uc5ec \ub9cc\ub4e0 \ube75 \uc804\ubb38 \ub9e4\uac70\uc9c4",
    "url": "https://www.instagram.com/bbang.morning?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@bbang.morning \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ud3ec\uc5e0\ub9e4\uac70\uc9c4\uc740 \u2018\uc2dc\u2019\ub97c \ub2e4\ub8e8\ub294 \ub9e4\uac70\uc9c4 \uacc4\uc815",
    "url": "https://www.instagram.com/poemmag/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@poemmag \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\uc6f0\ub2c8\uc2a4 \ub274\uc2a4 \ud398\uc774\uc9c0\ub294 \uc6b4\ub3d9\uacfc \uc2a4\ud3ec\uce20 \ube0c\ub79c\ub4dc \ub4f1\uc758 \uc18c\uc2dd\uc744 \uc804\ub2ec\ud558\ub294 \ub9e4\uac70\uc9c4",
    "url": "https://www.instagram.com/wellness.mate/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@wellness.mate \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "NewDoingSwim\uc740 \uc218\uc601 \ucf58\ud150\uce20\ub97c \uc5c5\ub85c\ub4dc\ud558\ub294 \uc218\uc601 \uc804\ubb38 \ub9e4\uac70\uc9c4\nhttps://www.instagram.com/newdoingswim/",
    "url": "https://www.instagram.com/newdoingswim/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@newdoingswim \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ub8e9\uc2a4 \ub9e4\uac70\uc9c4\uc740 \uad11\uace0\uc640 \ub9c8\ucf00\ud305 \ubd84\uc57c\ub97c \uc804\ubb38\uc801\uc73c\ub85c \ub2e4\ub8e8\ub294 \ub9e4\uac70\uc9c4 \uacc4\uc815\n\nhttps://www.instagram.com/luxmag.kr/",
    "url": "https://www.instagram.com/luxmag.kr/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@luxmag.kr \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ub178\ub4dc \ub9e4\uac70\uc9c4\uc740 \ub514\uc790\uc778 \uc804\ubb38 \ub9e4\uac70\uc9c4 \uacc4\uc815",
    "url": "https://www.instagram.com/nodd_mag/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ubbf8\ubd84\ub958",
    "description": "@nodd_mag \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "Instagram Reference",
    "url": "https://www.instagram.com/p/DQdNTkdEmey/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\ub9ac\ubdf0",
    "description": "\uc778\uc2a4\ud0c0\uadf8\ub7a8\uc5d0\uc11c \uc2a4\ud06c\ub7a9\ud55c \ucf58\ud150\uce20 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "woo (@wodnrla) \u2022 Instagram profile",
    "url": "https://www.instagram.com/wodnrla/reels/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc77c\uc0c1/\ube0c\uc774\ub85c\uadf8 _ \ucd2c\uc601 \ud3b8\uc9d1",
    "description": "@wodnrla \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/491468905_1072886384653040_1370578762125360020_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=104&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMyIn0%3D&_nc_ohc=dvkhg9KqUZMQ7kNvwEuZXln&_nc_oc=AdlxGgASZ0SaUTiV3SYeaqGRtxWZf7Y4k70Ifio8zdGiUxRxYwPpFLXBGs_kQLs2hG4&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_AfpTNTccvWC_9z74ybQ_fvjEvowB4hJaZf1C9SbyDC8N7w&oe=6963FFE3",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "@summersoul_official) \u2022 Instagram profile",
    "url": "https://www.instagram.com/summersoul_official/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc9c1\uc6d0\ub4e4",
    "description": "@summersoul_official \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/291063552_2060820600768704_4676967733085098727_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=109&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4zMjAuQzMifQ%3D%3D&_nc_ohc=KMp5CKB7JeEQ7kNvwFxe4yJ&_nc_oc=Adl_wzgu7Vxkrl-9CHE-gy0C6B1Hj6jJlC7LfUeFb33vhhTcbgW7L3zURmDMRzQWFwU&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=00_AfoDpF68bNREYJ3-yyHvn5gJmoYmT2BvrkvyrQRgSX6c1A&oe=6963DFA3",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ub9db\ub3c4\ub9ac\uc6d4\ub4dc (@matdori.world) \u2022 Instagram profile",
    "url": "https://www.instagram.com/matdori.world/reels/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc774\uac83\uc800\uac83 \uc870\ud68c\uc218 \uc798\ub098\uc624\ub294",
    "description": "@matdori.world \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.82787-19/607408670_18176206699370132_3728296930460083453_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=nqDtmrb9dvUQ7kNvwEVRqxf&_nc_oc=AdkQfS-oFGcoGi-aPCPefENUY8BZAXe4YW4GhirJZ59WzYpOZGFsI-Is6Z5hWxDgL_0&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_gid=jKl6iKojG5HaoAcV0xzauQ&oh=00_AfrLN89aqPxthkoSKWrOAwZNhVdKPSa0Xeqv_O2QNQnZKQ&oe=6963E346",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  },
  {
    "name": "\ucf69\uc21c\uc774\ub124 | \uc9d1\uafb8\ubbf8\uae30 \u2022 \uc9d1\ubc25 \u2022 \uc0b4\ub9bc \ud83c\udfe1 (@kongsoon_home) \u2022 Instagram profile",
    "url": "https://www.instagram.com/kongsoon_home/",
    "category": "\ud3b8\uc9d1/\ucf58\ud150\uce20",
    "subcategory": "\uc0b4\ub9bc",
    "description": "@kongsoon_home \uc778\uc2a4\ud0c0\uadf8\ub7a8 \uacc4\uc815 \ub808\ud37c\ub7f0\uc2a4\uc785\ub2c8\ub2e4.",
    "memo": "",
    "image": "https://scontent-iad3-1.cdninstagram.com/v/t51.82787-19/522626922_17854622823478090_5972754363724755525_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=C0qCE-6iiN4Q7kNvwER2n8o&_nc_oc=AdnRAfSGCO8h4-0VbJ8-dfdFPl1b_VWi2YzV2bZIOYRXRdr2r3LGZ6wDw3l7BJO90gU&_nc_zt=24&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_gid=A90rp21eXlZJJghmkLHmYA&oh=00_AfnEqIGAJGAo32fWeMabsSwa1lqfId00nj7lMEEhzMx11g&oe=695126D0",
    "editor": "Codex",
    "editInfo": "\ub178\uc158 \uc778\uc2a4\ud0c0 \uc2a4\ud06c\ub7a9"
  }
];

let sites = loadSites();
let activeCategory = null;
let query = "";

const folderBoard = document.querySelector("#folderBoard");
const contentArea = document.querySelector("#contentArea");
const siteGrid = document.querySelector("#siteGrid");
const searchInput = document.querySelector("#searchInput");
const resultTitle = document.querySelector("#resultTitle");
const activeCategoryLabel = document.querySelector("#activeCategoryLabel");
const emptyState = document.querySelector("#emptyState");
const dialog = document.querySelector("#siteDialog");
const form = document.querySelector("#siteForm");
const deleteButton = document.querySelector("#deleteButton");
const addInFolderButton = document.querySelector("#addInFolderButton");

document.querySelector("#addSiteButton").addEventListener("click", () => openEditor());
document.querySelector("#closeDialogButton").addEventListener("click", () => dialog.close());
document.querySelector("#cancelButton").addEventListener("click", () => dialog.close());
document.querySelector("#resetButton").addEventListener("click", resetSites);
document.querySelector("#allFoldersButton").addEventListener("click", showFolders);
document.querySelector("#backToFoldersButton").addEventListener("click", showFolders);
addInFolderButton.addEventListener("click", () => openEditor());

searchInput.addEventListener("input", (event) => {
  query = event.target.value.trim().toLowerCase();
  if (query) activeCategory = null;
  render();
});

form.addEventListener("submit", saveSite);
deleteButton.addEventListener("click", deleteSite);

render();

function site(name, url, category, description, memo = "", status = "검토 전") {
  return { name, url, category, description, memo, status };
}

function loadSites() {
  const defaults = [...initialSites, ...notionSites, ...trendResearchSites, ...refSearchSites, ...instagramSites].map(prepareSite);
  const saved = localStorage.getItem(storageKey);
  if (!saved) return defaults;

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return defaults;
    const savedSites = parsed
      .map(prepareSite)
      .filter((item) => item.url !== "https://app.notion.com/p/2cd426a205fc80dbb31fc3fc22073624");
    const savedUrls = new Set(savedSites.map((item) => item.url));
    const missingDefaults = defaults.filter((item) => !savedUrls.has(item.url));
    return [...savedSites, ...missingDefaults];
  } catch {
    return defaults;
  }
}

function prepareSite(item) {
  const category = item.category === "편집/콘텐츠" ? "콘텐츠" : item.category === "SNS·비주얼" ? "레퍼런스 수집" : item.category;
  const normalizedCategory = categories.includes(category) ? category : "경쟁사 광고";
  return {
    id: item.id || crypto.randomUUID(),
    name: item.name || "",
    url: item.url || "",
    category: normalizedCategory,
    subcategory: item.subcategory || "",
    description: item.description || "",
    tags: normalizeTags(item, normalizedCategory),
    memo: normalizeMemo(item.memo || "", normalizedCategory),
    editor: item.editor || "Codex",
    status: item.status || "검토 전",
    editInfo: item.editInfo || "초기 추천 목록",
    image: item.image || previewImageFor(item.url || "https://example.com"),
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}
function normalizeTags(item, category) {
  const explicit = Array.isArray(item.tags)
    ? item.tags
    : typeof item.tags === "string"
      ? item.tags.split(/[,#]/)
      : [];
  const source = [item.name, item.category, item.subcategory, item.description, item.memo].filter(Boolean).join(" ").toLowerCase();
  const tags = [...explicit.map((tag) => String(tag).trim()).filter(Boolean)];
  const push = (tag) => { if (tag && !tags.includes(tag)) tags.push(tag); };
  const add = (tag, tests) => {
    if (tests.some((test) => source.includes(test.toLowerCase()))) push(tag);
  };

  push(category ? category.replace(" ????", "") : "");
  push(item.subcategory || "");
  add("???", ["brand", "branding", "identity", "rebrand", "???", "???", "?????", "??", "??"]);
  add("???", ["type", "typo", "font", "fonts", "???", "??"]);
  add("??", ["color", "colour", "palette", "??", "??", "??"]);
  add("???", ["package", "packaging", "???"]);
  add("??", ["ad", "ads", "advertising", "??", "campaign", "???"]);
  add("??", ["video", "film", "shot", "vimeo", "youtube", "??", "??", "??"]);
  add("??", ["motion", "animation", "lottie", "??", "?????"]);
  add("?/UI", ["web", "ui", "ux", "site", "landing", "?", "??", "????", "???", "??", "??"]);
  add("??", ["photo", "photography", "image", "ignant", "??", "??", "??", "??"]);
  add("???", ["graphic", "poster", "visual", "???", "???", "???"]);
  add("???", ["trend", "trends", "???"]);
  add("???", ["research", "report", "data", "survey", "???", "???", "???", "??", "???"]);
  add("??", ["copy", "email", "crm", "??", "???", "crm"]);
  add("???", ["content", "contents", "instagram", "sns", "???", "???", "sns", "??", "??"]);
  add("????", ["illustration", "illustrator", "draw", "????", "???"]);

  return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))].slice(0, 5);
}
function normalizeMemo(memo, category) {
  const autoMemoPattern = new RegExp("\uC5D0\uC11C \uAC00\uC838\uC628 \uC778\uC2A4\uD0C0\uADF8\uB7A8 \uC2A4\uD06C\uB7A9\uC785\uB2C8\uB2E4|\uBA54\uBAA8\uB97C \uC5F4\uC5B4 \uD65C\uC6A9 \uD3EC\uC778\uD2B8\uB97C \uCD94\uAC00\uD558\uC138\uC694");
  return category === categories[10] && autoMemoPattern.test(memo) ? "" : memo;
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(sites));
}

function render() {
  renderFolders();
  const shouldShowCards = Boolean(activeCategory || query);
  contentArea.hidden = !shouldShowCards;
  folderBoard.hidden = Boolean(query);
  if (shouldShowCards) renderCards(getFilteredSites());
}

function renderFolders() {
  folderBoard.innerHTML = "";
  categories.forEach((category, index) => {
    const count = sites.filter((item) => item.category === category).length;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `folder-card${activeCategory === category ? " is-active" : ""}`;
    button.style.setProperty("--folder-color", folderColors[index % folderColors.length]);
    button.innerHTML = `
      <h2>${escapeHtml(category)}</h2>
      <div class="folder-meta"><span>${count} links</span><b>→</b></div>
    `;
    button.addEventListener("click", () => {
      activeCategory = category;
      query = "";
      searchInput.value = "";
      render();
      contentArea.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    folderBoard.append(button);
  });
}

function getFilteredSites() {
  return sites.filter((item) => {
    const matchesCategory = !activeCategory || item.category === activeCategory;
    const text = [item.name, item.url, item.category, item.subcategory, ...(item.tags || []), item.description, item.memo, item.editInfo].join(" ").toLowerCase();
    return matchesCategory && (!query || text.includes(query));
  });
}

function renderCards(items) {
  siteGrid.innerHTML = "";
  const isContentFolder = activeCategory === categories[10] && !query;
  siteGrid.classList.toggle("is-grouped", isContentFolder);
  emptyState.hidden = items.length > 0;
  activeCategoryLabel.textContent = query ? "Search Result" : "Folder";
  resultTitle.textContent = query ? `검색 결과 ${items.length}개` : `${activeCategory} 링크 ${items.length}개`;

  if (isContentFolder) {
    renderGroupedCards(items);
    return;
  }

  items.forEach((item) => siteGrid.append(createSiteCard(item)));
}

function renderGroupedCards(items) {
  const grouped = items.reduce((groups, item) => {
    const key = item.subcategory || "미분류";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
    return groups;
  }, new Map());

  grouped.forEach((groupItems, groupName) => {
    const section = document.createElement("section");
    section.className = "subcategory-section";
    section.innerHTML = `
      <div class="subcategory-heading">
        <h3>${escapeHtml(groupName)}</h3>
        <span>${groupItems.length}개</span>
      </div>
    `;
    const groupGrid = document.createElement("div");
    groupGrid.className = "cards-grid subcategory-grid";
    groupItems.forEach((item) => groupGrid.append(createSiteCard(item)));
    section.append(groupGrid);
    siteGrid.append(section);
  });
}

function createSiteCard(item) {
  const hidePreview = item.category === categories[10] || item.category === categories[11];
  const card = document.createElement("article");
  card.className = `site-card${hidePreview ? " no-preview" : ""}`;
  card.innerHTML = `
    ${hidePreview ? "" : `
      <a class="preview-link" href="${escapeAttribute(item.url)}" target="_blank" rel="noreferrer" aria-label="${escapeAttribute(item.name)} 방문">
        <img class="preview-image" src="${escapeAttribute(item.image || previewImageFor(item.url))}" alt="${escapeAttribute(item.name)} 페이지 미리보기" loading="lazy" onerror="this.closest('.preview-link').classList.add('is-fallback'); this.remove();" />
        <span class="preview-fallback">${escapeHtml(cleanUrl(item.url))}</span>
      </a>
    `}
    <div class="bookmark-body">
      <div class="card-tags">${(item.tags || []).map((tag) => `<span class="card-kicker">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="site-card-header"><h3>${escapeHtml(item.name)}</h3></div>
      <p>${escapeHtml(item.description)}</p>
      <div class="memo-box"><strong>메모</strong><p>${escapeHtml(item.memo || "")}</p></div>
      <div class="card-actions">
        <a class="plain-url" href="${escapeAttribute(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(cleanUrl(item.url))}</a>
        <button class="ghost-button" type="button" data-edit-id="${item.id}">수정</button>
      </div>
    </div>
  `;
  card.querySelector("[data-edit-id]")?.addEventListener("click", () => openEditor(item.id));
  card.querySelector("[data-delete-id]")?.addEventListener("click", () => deleteSiteById(item.id));
  return card;
}
function previewImageFor(url) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=640`;
}

function cleanUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname}${parsed.pathname === "/" ? "" : parsed.pathname}`;
  } catch {
    return url;
  }
}

function showFolders() {
  activeCategory = null;
  query = "";
  searchInput.value = "";
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openEditor(id) {
  const item = sites.find((entry) => entry.id === id);
  document.querySelector("#dialogTitle").textContent = item ? "링크 수정" : "링크 추가";
  document.querySelector("#siteId").value = item?.id || "";
  document.querySelector("#siteName").value = item?.name || "";
  document.querySelector("#siteUrl").value = item?.url || "";
  document.querySelector("#siteDescription").value = item?.description || "";
  document.querySelector("#siteSubcategory").value = item?.subcategory || "";
  document.querySelector("#siteTags").value = (item?.tags || []).join(", ");
  document.querySelector("#siteMemo").value = item?.memo || "";
  deleteButton.hidden = !item;

  const categorySelect = document.querySelector("#siteCategory");
  categorySelect.innerHTML = categories.map((category) => `<option value="${escapeAttribute(category)}">${escapeHtml(category)}</option>`).join("");
  categorySelect.value = item?.category || activeCategory || "경쟁사 광고";
  dialog.showModal();
}

function saveSite(event) {
  event.preventDefault();
  const id = document.querySelector("#siteId").value || crypto.randomUUID();
  const next = {
    id,
    name: document.querySelector("#siteName").value.trim(),
    url: document.querySelector("#siteUrl").value.trim(),
    category: document.querySelector("#siteCategory").value,
    description: document.querySelector("#siteDescription").value.trim(),
    subcategory: document.querySelector("#siteSubcategory").value.trim(),
    tags: document.querySelector("#siteTags").value.split(/[,#]/).map((tag) => tag.trim()).filter(Boolean),
    memo: document.querySelector("#siteMemo").value.trim(),
    editor: "Codex",
    status: itemStatusById(id),
    editInfo: "",
    image: previewImageFor(document.querySelector("#siteUrl").value.trim()),
    updatedAt: new Date().toISOString(),
  };

  const index = sites.findIndex((entry) => entry.id === id);
  if (index >= 0) sites[index] = next;
  else sites = [next, ...sites];
  activeCategory = next.category;
  persist();
  dialog.close();
  render();
}

function itemStatusById(id) {
  return sites.find((entry) => entry.id === id)?.status || "검토 전";
}

function deleteSite() {
  const id = document.querySelector("#siteId").value;
  deleteSiteById(id, true);
}

function deleteSiteById(id, closeDialog = false) {
  if (!id) return;
  if (!confirm("\uC774 \uB9C1\uD06C\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?")) return;
  sites = sites.filter((entry) => entry.id !== id);
  persist();
  if (closeDialog) dialog.close();
  render();
}

function resetSites() {
  if (!confirm("직접 수정한 내용이 기본 목록으로 초기화됩니다. 계속할까요?")) return;
  sites = [...initialSites, ...notionSites, ...instagramSites].map(prepareSite);
  persist();
  showFolders();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}