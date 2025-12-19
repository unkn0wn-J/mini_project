document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginIdInput = document.getElementById("loginId");
  const loginPwInput = document.getElementById("loginPw");

  if (!loginBtn) return; // 버튼 없을 경우 방어 코드

  loginBtn.addEventListener("click", login);

  function login() {
    const id = loginIdInput.value.trim();
    const pw = loginPwInput.value;

    if (!id || !pw) {
      alert("아이디와 비밀번호를 입력하세요");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.id === id && u.pw === pw);

    if (!user) {
      alert("아이디 또는 비밀번호가 틀렸습니다");
      return;
    }

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("loginUser", id);

    alert("로그인 성공");
    location.href = "admin_project.html";
  }
});
