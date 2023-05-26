/*首先获取登录表单元素并添加了提交事件监听器。
 * 当用户点击登录按钮时，该事件监听器将阻止表单默认的提交行为，
 * 获取用户名和密码输入框的值，并创建一个包含用户名和密码的对象。
 * 然后，我们可以将该对象发送到服务器进行验证，并处理服务器的响应。
 * 在这个示例中，我们仅仅打印了发送到服务器的用户凭据，并显示了一个登录成功的提示信息。*/
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>计算机辅助翻译系统</title>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>计算机辅助翻译系统</h1>
            <img src="avatar.png" alt="登录头像" class="avatar">
        </div>
        <hr>
        <form id="loginForm">
            <div class="input-field">
                <img src="user-icon.png" alt="用户图标">
                <label for="username">用户名</label>
                <input type="text" name="username" id="username">
            </div>
            <div class="input-field">
                <img src="lock-icon.png" alt="密码图标">
                <label for="password">密码</label>
                <input type="password" name="password" id="password">
            </div>
            <button type="submit">登录</button>
        </form>
        <div class="register">
            <a href="#">用户注册</a>
        </div>
    </div>

    <script>
        // 获取登录表单元素
        const loginForm = document.getElementById('loginForm');
        // 添加提交事件监听器
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // 阻止表单默认提交行为

            // 获取用户名和密码输入框的值
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // 进行表单验证，例如检查是否为空等

            // 创建一个包含用户名和密码的对象
            const userCredentials = {
                username: username,
                password: password
            };

            // 发送用户凭据到服务器进行验证
            // 你需要根据实际情况使用适当的方法发送HTTP请求，比如使用fetch或XMLHttpRequest
            // 这里仅为示例，显示一个提示信息
            console.log('发送用户凭据到服务器:', userCredentials);

            // 处理服务器响应，根据登录成功或失败显示相应的提示信息给用户
            // 这里仅为示例，显示一个登录成功的提示
            alert('登录成功！');
        });
    </script>
</body>
</html>
