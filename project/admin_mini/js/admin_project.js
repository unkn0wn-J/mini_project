/********************
 * DOM
 ********************/
const loginBtn = document.getElementById("loginBtn");
const joinBtn = document.getElementById("joinBtn");
const logoutBtn = document.getElementById("logoutBtn");
const darkBtn = document.getElementById("darkModeBtn");

const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

const productTable = document.getElementById("productTable");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageBtns = document.querySelectorAll(".page-btn");

/********************
 * 페이지 이동
 ********************/
loginBtn.onclick = () => (location.href = "login.html");
joinBtn.onclick = () => (location.href = "join.html");

/********************
 * 로그인 UI 처리 (✅ 하나만 유지)
 ********************/
function updateAuthUI() {
  const isLogin = localStorage.getItem("isLogin") === "true";

  loginBtn.classList.toggle("d-none", isLogin);
  joinBtn.classList.toggle("d-none", isLogin);
  logoutBtn.classList.toggle("d-none", !isLogin);
}

logoutBtn.onclick = () => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("loginUser");
  location.reload();
};

/********************
 * 다크모드 (✅ 유지 + 토글 정상화)
 ********************/
function applyDarkMode() {
  const isDark = localStorage.getItem("darkMode") === "on";
  document.body.classList.toggle("dark", isDark);
  darkBtn.innerText = isDark ? "White" : "Dark";
}

darkBtn.onclick = () => {
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "off" : "on");
  applyDarkMode();
};

/********************
 * 현재 시간
 ********************/
function updateTime() {
  document.getElementById("currentTime").innerText = new Date().toLocaleString(
    "ko-KR"
  );
}
updateTime();
setInterval(updateTime, 1000);

/********************
 * 상품 데이터 (더미 유지)
 ********************/
const products = [
  { cat: "상의", brand: "Nike", name: "맨투맨", price: 89000 },
  { cat: "하의", brand: "Adidas", name: "조거팬츠", price: 99000 },
  { cat: "신발", brand: "NB", name: "993", price: 259000 },
  { cat: "패션잡화", brand: "Supreme", name: "볼캡", price: 129000 },
  { cat: "신발", brand: "Nike", name: "에어포스", price: 139000 },
  { cat: "상의", brand: "Stussy", name: "후드티", price: 179000 },
];

let filtered = [...products];
let currentPage = 1;
const perPage = 4;
const totalPages = 3;

/********************
 * 테이블 렌더링
 ********************/
function render() {
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
          <td class="text-end">${p.price.toLocaleString()}원</td>
        </tr>
      `;
    } else {
      productTable.innerHTML += `
        <tr class="text-muted">
          <td>-</td>
          <td>-</td>
          <td>상품이 없습니다</td>
          <td class="text-end">-</td>
        </tr>
      `;
    }
  }
}

/********************
 * 검색 / 필터
 ********************/
function applyFilter() {
  const cat = categorySelect.value;
  const word = searchInput.value.trim();

  filtered = products.filter(
    (p) => (!cat || p.cat === cat) && (!word || p.name.includes(word))
  );

  currentPage = 1;
  setActivePage(1);
  render();
}

searchForm.onsubmit = (e) => {
  e.preventDefault();
  applyFilter();
};

categorySelect.onchange = applyFilter;

/********************
 * 페이지네이션
 ********************/
function setActivePage(page) {
  pageBtns.forEach((btn) => {
    btn.parentElement.classList.toggle(
      "active",
      Number(btn.dataset.page) === page
    );
  });
}

pageBtns.forEach((btn) => {
  btn.onclick = () => {
    currentPage = Number(btn.dataset.page);
    setActivePage(currentPage);
    render();
  };
});

prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    setActivePage(currentPage);
    render();
  }
};

nextBtn.onclick = () => {
  if (currentPage < totalPages) {
    currentPage++;
    setActivePage(currentPage);
    render();
  }
};

/********************
 * 최초 실행
 ********************/
updateAuthUI();
applyDarkMode();
render();
