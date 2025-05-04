const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
      alert('此帳號已存在');
    } else {
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('註冊成功！請登入');
      window.location.href = 'index.html';
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(u => u.username === username && u.password === password);
    if (validUser) {
      localStorage.setItem('currentUser', username);
      window.location.href = 'home.html';
    } else {
      alert('帳號或密碼錯誤');
    }
  });
}