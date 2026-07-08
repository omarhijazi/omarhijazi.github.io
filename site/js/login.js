document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMsg');

  // Mock credential check for testing/demo purposes only.
  if (username === 'username' && password === 'password') {
    window.location.href = 'success.html';
  } else {
    errorMsg.style.display = 'block';
  }
});
