/********************
 * AUTH - LOGIN
 ********************/
const loginBtn = document.getElementById("loginBtn");
const joinBtn = document.getElementById("joinBtn");
const logoutBtn = document.getElementById("logoutBtn");
const darkBtn = document.getElementById("darkModeBtn");
const genderSelect = document.getElementById("genderSelect");

/********************
 * 페이지 이동
 ********************/
if (loginBtn) loginBtn.onclick = () => (location.href = "login.html");
if (joinBtn) joinBtn.onclick = () => (location.href = "join.html");

/********************
 * 로그인 UI 처리
 ********************/
function updateAuthUI() {
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!loginBtn || !joinBtn || !logoutBtn) return;

  loginBtn.classList.toggle("d-none", isLogin);
  joinBtn.classList.toggle("d-none", isLogin);
  logoutBtn.classList.toggle("d-none", !isLogin);
}

if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("loginUser");
    location.reload();
  };
}

/********************
 * 다크모드
 ********************/
function applyDarkMode() {
  const isDark = localStorage.getItem("darkMode") === "on";
  document.body.classList.toggle("dark", isDark);
  if (darkBtn) darkBtn.innerText = isDark ? "White" : "Dark";
}

if (darkBtn) {
  darkBtn.onclick = () => {
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark ? "off" : "on");
    applyDarkMode();
  };
}

/********************
 * 현재 시간
 ********************/
function updateTime() {
  const el = document.getElementById("currentTime");
  if (!el) return;

  el.innerText = new Date().toLocaleString("ko-KR");
}
updateTime();
setInterval(updateTime, 1000);

/********************
 * 상품 데이터
 ********************/
const products = [
  { cat: "상의", brand: "Nike", name: "맨투맨", price: 89000, gender: "남성" },
  {
    cat: "하의",
    brand: "Adidas",
    name: "조거팬츠",
    price: 99000,
    gender: "남성",
  },
  { cat: "신발", brand: "NB", name: "993", price: 259000, gender: "남성" },
  {
    cat: "패션잡화",
    brand: "Supreme",
    name: "볼캡",
    price: 129000,
    gender: "여성",
  },
  {
    cat: "신발",
    brand: "Nike",
    name: "에어포스",
    price: 139000,
    gender: "여성",
  },
  {
    cat: "상의",
    brand: "Stussy",
    name: "후드티",
    price: 179000,
    gender: "여성",
  },
];

let filtered = [...products];
let currentPage = 1;
const perPage = 4;
const totalPages = 3;

/********************
 * DOM
 ********************/
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

const productTable = document.getElementById("productTable");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageBtns = document.querySelectorAll(".page-btn");

/********************
 * 테이블 렌더링
 ********************/
function render() {
  if (!productTable) return;

  productTable.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  for (let i = 0; i < perPage; i++) {
    const p = pageItems[i];

    if (p) {
      productTable.innerHTML += `
  <tr>
    <td>${p.cat}</td>
    <td>${p.brand}</td>
    <td>${p.name}</td>
    <td>${p.gender}</td>
    <td class="text-end">${p.price.toLocaleString()}원</td>
  </tr>
`;
    } else {
      productTable.innerHTML += `
  <tr class="text-muted">
    <td>-</td>
    <td>-</td>
    <td>상품이 없습니다</td>
    <td>-</td>
    <td class="text-end">-</td>
  </tr>
`;
    }
  }
}

/********************
 * 페이지네이션 active 처리 (⭐ 핵심)
 ********************/
function setActivePage(page) {
  pageBtns.forEach((btn) => {
    btn.parentElement.classList.toggle(
      "active",
      Number(btn.dataset.page) === page
    );
  });
}

/********************
 * 검색 / 필터
 ********************/
function applyFilter() {
  const cat = categorySelect.value;
  const gender = genderSelect.value;
  const word = searchInput.value.trim();

  filtered = products.filter(
    (p) =>
      (!cat || p.cat === cat) &&
      (!gender || p.gender === gender) &&
      (!word || p.name.includes(word))
  );

  currentPage = 1;
  setActivePage(currentPage);
  render();
}

if (searchForm) {
  searchForm.onsubmit = (e) => {
    e.preventDefault();
    applyFilter();
  };
}

if (categorySelect) {
  categorySelect.onchange = applyFilter;
}

if (genderSelect) {
  genderSelect.onchange = applyFilter;
}

/********************
 * 페이지네이션 버튼
 ********************/
pageBtns.forEach((btn) => {
  btn.onclick = () => {
    currentPage = Number(btn.dataset.page);
    setActivePage(currentPage);
    render();
  };
});

if (prevBtn) {
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      setActivePage(currentPage); // ⭐ 숫자 갱신
      render();
    }
  };
}

if (nextBtn) {
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      setActivePage(currentPage); // ⭐ 숫자 갱신
      render();
    }
  };
}

/********************
 * 최초 실행
 ********************/
updateAuthUI();
applyDarkMode();
setActivePage(currentPage); // ⭐ 최초 숫자 active
render();
