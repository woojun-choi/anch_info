# 🍃 동숲 성격사전

모여봐요 동물의 숲(ACNH) 주민들의 성격 8가지와, 성격마다 숨어있는 두 가지 대화 타입(A/B)을 정리해봤어요.
성격별 말투 특징부터 실제 게임 속 대사, 그 성격에 해당하는 주민 413명 전원까지 한눈에 볼 수 있는 카드 + 웹사이트입니다.

> 취향에 맞는 주민을 찾을 때, 혹은 "얘는 왜 이렇게 말투가 다르지?" 싶을 때 참고하기 좋아요.

&nbsp;

## ✨ 뭘 볼 수 있나요

- 성격 8종(먹보·운동광·무뚝뚝·느끼함·친절함·아이돌·성숙함·단순활발) 요약 카드
- 성격마다 나뉘는 대화 타입 A/B — 취미, 개인기 반응, 실제 게임 대사까지
- 성격별 전체 주민 갤러리 (얼굴 아이콘 + 이름, A/B 타입 표시)
- 주민 이름 검색이 되는 웹사이트 버전

&nbsp;

## 🖥 로컬에서 보기

```bash
python3 -m http.server 8791
# http://localhost:8791/web/index.html
```

&nbsp;

## 📁 폴더 구조

```
data/
  personalities.json       성격별 말투 · 취미 · A/B 대화 타입 설명
  villagers_full.json      주민 413명 개별 데이터 (성격, A/B, 영문명)
  villagers_by_type.json   성격 → A/B → 주민 목록으로 그룹화한 데이터
  dialogue_source/         성격별 실제 게임 대사 원본 발췌

cards/
  card.html                성격 정보 카드 템플릿 (?id=lazy)
  gallery.html             성격별 주민 갤러리 카드 템플릿 (&layout=wide로 가로형)

images/
  info_*.png, gallery_*.png   성격별 카드 완성 이미지 (2x 해상도)
  villagers/ · faces/          주민 아이콘 원본 / 얼굴 위주로 크롭한 버전

web/
  index.html, js/site.js, styles/   해시 라우팅 웹사이트 (동숲풍 디자인 토큰 시스템)
```

&nbsp;

## 📚 출처 & 참고

성격·대화 타입 관련 자료는 닌텐도 공식 정보가 아니라 대부분 커뮤니티가 오랫동안 데이터마이닝하고 정리해온 결과물이에요. 이 프로젝트도 아래 자료들을 참고해서 만들었습니다.

- [ACNH 친밀도 대사 스프레드시트](https://docs.google.com/spreadsheets/u/0/d/13CCmVCL1e4ldIeVlP_dKEO9iaetMYbEzAaQIv47KVYY/htmlview) — 주민 성격별 A/B 명단과 친밀도 단계별 실제 게임 대사
- [주민타입/취미 스프레드시트](https://docs.google.com/spreadsheets/d/1XsB-H-iSa7CM0aZyZ8qNxoCUQoKHv1gZwUifZA2k4og/htmlview) — 성격별 A/B 취미 정리
- [모여봐요 동물의 숲 마이너 갤러리 - 성격별 대화 타입 정리](https://gall.dcinside.com/mgallery/board/view/?id=acnewhorizons&no=1504570) — 성격 A/B별 특징과 예시 주제
- [나무위키 - 동물의 숲 시리즈/일반 주민](https://namu.wiki/w/동물의%20숲%20시리즈/일반%20주민) — 성격별 특징, 취미-대화 타입 규칙
- [nooks-list.com](https://nooks-list.com) — 주민 목록 및 아이콘 이미지

&nbsp;

## ⚠️ 참고해주세요

- A/B 대화 타입은 커뮤니티 데이터마이닝 기반이라, 최근에 추가된 주민 일부는 아직 확인이 안 된 경우가 있어요.
- 주민 아이콘은 닌텐도의 저작물입니다. 이 프로젝트는 비영리 개인 팬 프로젝트예요.
