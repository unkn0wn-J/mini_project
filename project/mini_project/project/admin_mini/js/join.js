document.addEventListener("DOMContentLoaded", () => {
  const joinForm = document.getElementById("joinForm");
  if (!joinForm) return;

  joinForm.addEventListener("submit", join);

  function join(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("joinId").value.trim();
    const pw = document.getElementById("pw").value;
    const pw2 = document.getElementById("pw2").value;
    const email = document.getElementById("email").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!name) return alert("이름을 입력하지 않았습니다");
    if (!id) return alert("아이디를 입력하지 않았습니다");
    if (id.length < 4) return alert("아이디는 4자 이상이어야 합니다");

    if (!pw) return alert("비밀번호를 입력하지 않았습니다");
    if (pw.length < 6) return alert("비밀번호는 6자 이상이어야 합니다");

    if (!pw2) return alert("비밀번호 확인을 입력하지 않았습니다");
    if (pw !== pw2) return alert("비밀번호가 서로 다릅니다");

    if (!gender) return alert("성별을 선택하지 않았습니다");
    if (!email) return alert("이메일을 입력하지 않았습니다");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return alert("이메일 형식이 올바르지 않습니다");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.id === id))
      return alert("이미 사용 중인 아이디입니다");

    users.push({
      name,
      id,
      pw,
      email,
      gender: gender.value,
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert(
      `회원가입이 완료되었습니다.

이름 : ${name}
아이디 : ${id}
이메일 : ${email}
성별 : ${gender.value}`
    );

    location.href = "login.html";
  }
});
