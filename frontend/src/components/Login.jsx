function Login() {
  async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    });

    if (res.ok) {
      // موفقیت: برو به داشبورد
      window.location.href = "/dashboard";
    } else {
      alert("نام کاربری یا رمز اشتباه است!");
    }
  }

  return (
    <div className="login-form">
      <h2>ورود</h2>
      <input id="username" placeholder="نام کاربری" />
      <input id="password" type="password" placeholder="رمز عبور" />
      <button onClick={handleLogin}>ورود</button>
    </div>
  );
}
