// JavaScript source code
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // ��ֹ��Ĭ���ύ��Ϊ

    // ��ȡ������û���������
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // ���͵�¼���󵽺�ˣ�ʾ����ʹ��Ajax����
    // �������ʹ���ʵ���Ajax������б�дAjax������
    // �����˵�¼�ӿ�Ϊ '/api/login'
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // ��¼�ɹ�
                alert('��¼�ɹ���');
                // ��ת���û���ҳ��������Ҫ��¼����ʵ�ҳ��
                window.location.href = 'home.html';
            } else {
                // ��¼ʧ��
                alert('��¼ʧ�ܣ������û��������룡');
            }
        }
    };
    xhr.send(JSON.stringify({ username: username, password: password }));
});
