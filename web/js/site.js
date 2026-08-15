const DATA_BASE = '../data/';
const FACE_BASE = '../images/faces/';

let personalities = null;
let villagersByType = null;

async function loadData() {
  if (personalities && villagersByType) return;
  const [pRes, vRes] = await Promise.all([
    fetch(DATA_BASE + 'personalities.json'),
    fetch(DATA_BASE + 'villagers_by_type.json'),
  ]);
  personalities = await pRes.json();
  villagersByType = await vRes.json();
}

function faceUrl(en) {
  return FACE_BASE + encodeURIComponent(en) + '.png';
}

function renderLanding(root) {
  const total = personalities.length;
  root.innerHTML = `
    <div class="hero">
      <h1>동숲 성격사전</h1>
      <p>모여봐요 동물의 숲 주민 ${total}가지 성격별 대화 타입과 전체 주민 갤러리</p>
    </div>
    <div class="sign-grid">
      ${personalities.map(p => {
        const group = villagersByType[p.personalityKey] || { A: [], B: [], '미분류': [] };
        const total = group.A.length + group.B.length + (group['미분류'] || []).length;
        return `
        <a class="sign-card" href="#/${p.id}" data-personality="${p.id}">
          <div class="badge">${p.emoji}</div>
          <div class="kr">${p.nameKr}</div>
          <div class="en">${p.nameEn}</div>
          <div class="count">전체 ${total}명</div>
        </a>`;
      }).join('')}
    </div>
    <div class="footer-note">주민 아이콘 출처: nooks-list.com · A/B 대화 타입은 커뮤니티 데이터라 일부 신규 주민은 미분류로 표시됩니다</div>
  `;
}

function vitemHtml(v) {
  return `
    <div class="vitem" data-name="${v.kr.toLowerCase()}">
      <div class="vicon"><img src="${faceUrl(v.en)}" alt="${v.kr}" loading="lazy"></div>
      <div class="vname">${v.kr}</div>
    </div>`;
}

function renderDetail(root, id) {
  const p = personalities.find(d => d.id === id);
  if (!p) {
    root.innerHTML = `<p>존재하지 않는 성격입니다. <a href="#/">← 목록으로</a></p>`;
    return;
  }
  const group = villagersByType[p.personalityKey] || { A: [], B: [], '미분류': [] };
  const misc = group['미분류'] || [];
  const total = group.A.length + group.B.length + misc.length;

  root.innerHTML = `
    <div data-personality="${p.id}">
      <div class="detail-header">
        <div class="badge">${p.emoji}</div>
        <div>
          <div class="kr">${p.nameKr}</div>
          <div class="meta">${p.nameEn} · ${p.gender} · 1인칭 "${p.firstPerson}" · 전체 ${total}명</div>
        </div>
      </div>

      <div class="card">
        <div class="quote-box">
          <div class="label">대표 대사</div>
          <div class="text">"${p.speechSample}"</div>
          <div class="style">${p.speechStyle}</div>
        </div>
        <div class="vibe">${p.vibe}</div>

        <div class="subtype-grid">
          ${subtypeBoxHtml('A', p.subtypeA)}
          ${subtypeBoxHtml('B', p.subtypeB)}
        </div>
      </div>

      <div class="gallery-toolbar">
        <h2>주민 갤러리</h2>
        <input class="search-box" type="text" placeholder="주민 이름 검색..." id="villagerSearch">
      </div>

      <div class="panels">
        <div class="panel">
          <div class="panel-head"><span class="label">성격 A</span><span class="count">${group.A.length}명</span></div>
          <div class="vgrid" id="gridA">${group.A.map(vitemHtml).join('')}</div>
        </div>
        <div class="panel">
          <div class="panel-head"><span class="label">성격 B</span><span class="count">${group.B.length}명</span></div>
          <div class="vgrid" id="gridB">${group.B.map(vitemHtml).join('')}</div>
        </div>
      </div>

      ${misc.length > 0 ? `
      <div class="misc-panel">
        <div class="panel-head"><span class="label">미분류</span><span class="count">${misc.length}명 · A/B 타입 확인 전</span></div>
        <div class="vgrid" id="gridMisc">${misc.map(vitemHtml).join('')}</div>
      </div>` : ''}

      <div class="footer-note"><a href="#/">← 성격 목록으로</a></div>
    </div>
  `;

  const searchInput = document.getElementById('villagerSearch');
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('.vitem').forEach(el => {
      const match = !q || el.dataset.name.includes(q);
      el.classList.toggle('hidden', !match);
    });
  });
}

function subtypeBoxHtml(label, s) {
  return `
    <div class="subtype-box">
      <div class="type-label"><span class="dot"></span>성격 ${label}</div>
      <div class="meta-row"><span>취미</span><b>${s.hobby}</b></div>
      <div class="meta-row"><span>개인기 반응</span><b>${s.reaction}</b></div>
      <div class="theme">${s.theme}</div>
      <div class="sample">"${s.sample}"</div>
    </div>`;
}

async function route() {
  await loadData();
  const root = document.getElementById('app');
  const topbarExtra = document.getElementById('topbarExtra');
  const hash = location.hash.replace(/^#\/?/, '');

  if (!hash) {
    topbarExtra.innerHTML = '';
    renderLanding(root);
  } else {
    topbarExtra.innerHTML = `<a class="back-link" href="#/">← 목록</a>`;
    renderDetail(root, hash);
    window.scrollTo(0, 0);
  }
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
