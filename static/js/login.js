document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('ورود:', { role, username, password });
    // اینجا می‌توان به بک‌اند درخواست فرستاد (fetch)
    window.location.href = "/dashboard"; // مثال برای رفتن به داشبورد
});
