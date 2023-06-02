// JavaScript source code
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // 阻止表单默认提交行为

    // 获取输入的用户名和密码
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // 发送登录请求到后端（示例：使用Ajax请求）
    // 这里可以使用适当的Ajax库或自行编写Ajax请求函数
    // 假设后端登录接口为 '/api/login'
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // 登录成功
                alert('登录成功！');
                // 跳转到用户主页或其他需要登录后访问的页面
                window.location.href = 'home.html';
            } else {
                // 登录失败
                alert('登录失败，请检查用户名和密码！');
            }
        }
    };
    xhr.send(JSON.stringify({ username: username, password: password }));
});
