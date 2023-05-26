document.querySelector('button[type="submit"]').addEventListener('click', function(e) {
    e.preventDefault(); // 阻止表单默认提交行为
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('password-confirm').value;
  
    if (!username || !password || !confirmPassword) {
      alert('请填写所有必填字段！');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('两次输入的密码不一致！');
      return;
    }
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          alert('注册成功！');
          window.location.href = '/login.html';
        } else {
          alert('注册失败，请稍后重试！');
        }
      }
    };
    xhr.send(JSON.stringify({ username: username, password: password }));
  });