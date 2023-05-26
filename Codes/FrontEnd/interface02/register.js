// JavaScript source code
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault(); // 阻止表单默认提交行为

    // 获取输入的用户名和密码
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // 发送注册请求到后端（示例：使用Ajax请求）
    // 这里可以使用适当的Ajax库或自行编写Ajax请求函数
    // 假设后端注册接口为 '/api/register'
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // 注册成功
                alert('注册成功！');
                // 跳转到登录页面
                window.location.href = 'login.html';
            } else {
                // 注册失败
                alert('注册失败，请重试！');
            }
        }
    };
    xhr.send(JSON.stringify({ username: username, password: password }));
});
