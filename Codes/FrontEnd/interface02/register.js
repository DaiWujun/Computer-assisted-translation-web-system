// JavaScript source code
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault(); // ��ֹ��Ĭ���ύ��Ϊ

    // ��ȡ������û���������
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // ����ע�����󵽺�ˣ�ʾ����ʹ��Ajax����
    // �������ʹ���ʵ���Ajax������б�дAjax������
    // ������ע��ӿ�Ϊ '/api/register'
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // ע��ɹ�
                alert('ע��ɹ���');
                // ��ת����¼ҳ��
                window.location.href = 'login.html';
            } else {
                // ע��ʧ��
                alert('ע��ʧ�ܣ������ԣ�');
            }
        }
    };
    xhr.send(JSON.stringify({ username: username, password: password }));
});
