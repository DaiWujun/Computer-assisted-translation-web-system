/*���Ȼ�ȡ��¼��Ԫ�ز�������ύ�¼���������
 * ���û������¼��ťʱ�����¼�����������ֹ��Ĭ�ϵ��ύ��Ϊ��
 * ��ȡ�û���������������ֵ��������һ�������û���������Ķ���
 * Ȼ�����ǿ��Խ��ö����͵�������������֤�����������������Ӧ��
 * �����ʾ���У����ǽ�����ӡ�˷��͵����������û�ƾ�ݣ�����ʾ��һ����¼�ɹ�����ʾ��Ϣ��*/
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>�������������ϵͳ</title>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>�������������ϵͳ</h1>
            <img src="avatar.png" alt="��¼ͷ��" class="avatar">
        </div>
        <hr>
        <form id="loginForm">
            <div class="input-field">
                <img src="user-icon.png" alt="�û�ͼ��">
                <label for="username">�û���</label>
                <input type="text" name="username" id="username">
            </div>
            <div class="input-field">
                <img src="lock-icon.png" alt="����ͼ��">
                <label for="password">����</label>
                <input type="password" name="password" id="password">
            </div>
            <button type="submit">��¼</button>
        </form>
        <div class="register">
            <a href="#">�û�ע��</a>
        </div>
    </div>

    <script>
        // ��ȡ��¼��Ԫ��
        const loginForm = document.getElementById('loginForm');
        // ����ύ�¼�������
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // ��ֹ��Ĭ���ύ��Ϊ

            // ��ȡ�û���������������ֵ
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // ���б���֤���������Ƿ�Ϊ�յ�

            // ����һ�������û���������Ķ���
            const userCredentials = {
                username: username,
                password: password
            };

            // �����û�ƾ�ݵ�������������֤
            // ����Ҫ����ʵ�����ʹ���ʵ��ķ�������HTTP���󣬱���ʹ��fetch��XMLHttpRequest
            // �����Ϊʾ������ʾһ����ʾ��Ϣ
            console.log('�����û�ƾ�ݵ�������:', userCredentials);

            // �����������Ӧ�����ݵ�¼�ɹ���ʧ����ʾ��Ӧ����ʾ��Ϣ���û�
            // �����Ϊʾ������ʾһ����¼�ɹ�����ʾ
            alert('��¼�ɹ���');
        });
    </script>
</body>
</html>
