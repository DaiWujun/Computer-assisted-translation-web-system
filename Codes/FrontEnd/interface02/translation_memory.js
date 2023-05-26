/*ʹ��Ajax������API����ȡ����������Ŀ��Ϣ����ʾ�ڱ���С�
Ϊ�༭�������Ȱ�ť��ӵ���¼���ʵ����ع��ܡ�
ʹ��Ajax���˽��н�����ʵ�ַ�������ĸ��¡������Ȳ�����*/
< !DOCTYPE html >
    <html>
        <head>
            <title>��������</title>
            <link rel="stylesheet" href="translation_memory.css">
</head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>��������</h1>
                        <img src="avatar.png" alt="��¼ͷ��">
        </div>
                        <div class="nav">
                            <button id="mainBtn">��ҳ��</button>
                            <button id="translationMemoryBtn" class="active">��������</button>
                            <button id="terminologyBtn">�����</button>
                        </div>
                        <div class="search">
                            <div>
                                <input type="text" id="keywordInput" placeholder="������Ŀ���ƹؼ���">
                                    <button id="searchBtn">����</button>
            </div>
                            </div>
                            <table id="table" class="table">
                                <thead>
                                    <tr>
                                        <th>��Ŀ����</th>
                                        <th>����ʱ��</th>
                                        <th>�༭</th>
                                        <th>����</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                </tbody>
                            </table>
                            <div class="actions">
                                <button id="importBtn">����</button>
                                <button id="exportBtn">����</button>
                            </div>
                        </div>

                        <script>
        // ��ȡҳ���ϵ�Ԫ��
                            var mainBtn = document.getElementById('mainBtn');
                            var translationMemoryBtn = document.getElementById('translationMemoryBtn');
                            var terminologyBtn = document.getElementById('terminologyBtn');
                            var keywordInput = document.getElementById('keywordInput');
                            var searchBtn = document.getElementById('searchBtn');
                            var importBtn = document.getElementById('importBtn');
                            var exportBtn = document.getElementById('exportBtn');
                            var tableBody = document.getElementById('tableBody');

                            // ��ӵ���¼�������
                            mainBtn.addEventListener('click', navigateToMainPage);
                            terminologyBtn.addEventListener('click', navigateToTerminology);
                            searchBtn.addEventListener('click', searchTranslationMemory);
                            importBtn.addEventListener('click', importTranslationMemory);
                            exportBtn.addEventListener('click', exportTranslationMemory);

                            // ҳ�������ɺ��ʼ��
                            window.addEventListener('load', function () {
                                loadTranslationMemory();
        });

                            // ��������ҳ�溯��ʾ��
                            function navigateToMainPage() {
                                // ��������ҳ�棬����ʵ�����������Ӧ�Ĳ���
                                console.log('��������ҳ��');
        }

                            // �����������ҳ�溯��ʾ��
                            function navigateToTerminology() {
                                // �����������ҳ�棬����ʵ�����������Ӧ�Ĳ���
                                console.log('�����������ҳ��');
        }

                            // ���ط������⺯��ʾ��
                            function loadTranslationMemory() {
            // ʹ��Ajax������API��ȡ����������Ŀ��Ϣ
            // �滻�����URLΪʵ�ʵĺ��API��ַ
            var url = 'https://api.example.com/translation-memory';
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', url, true);
                            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                            displayTranslationMemory(response);
                }
            };
                            xhr.send();
        }

                            // ��ʾ����������Ŀ��Ϣ����ʾ��
                            function displayTranslationMemory(data) {
                                // ��ձ������
                                tableBody.innerHTML = '';

                            // �������ݣ����ɱ����
                            for (var i = 0; i < data.length; i++) {
                var row = document.createElement('tr');
                            var nameCell = document.createElement('td');
                            var updateTimeCell = document.createElement('td');
                            var editCell = document.createElement('td');
                            var exportCell = document.createElement('td');

                            nameCell.textContent = data[i].name;
                            updateTimeCell.textContent = data[i].updateTime;

                            var editButton = document.createElement('button');
                            editButton.textContent = '�༭';
                            editButton.addEventListener('click', function () {
                                editTranslationMemory(data[i].id);
                });
                            editCell.appendChild(editButton);

                            var exportButton = document.createElement('button');
                            exportButton.textContent = '����';
                            exportButton.addEventListener('click', function () {
                                exportTranslationMemory(data[i].id);
                });
                            exportCell.appendChild(exportButton);

                            row.appendChild(nameCell);
                            row.appendChild(updateTimeCell);
                            row.appendChild(editCell);
                            row.appendChild(exportCell);

                            tableBody.appendChild(row);
            }
        }

                            // �����������⺯��ʾ��
                            function searchTranslationMemory() {
            var keyword = keywordInput.value;
                            // ʹ��Ajax������API������������
                            // �滻�����URLΪʵ�ʵĺ��API��ַ�����ؼ�����Ϊ��ѯ�������ݸ����
                            var url = 'https://api.example.com/translation-memory?keyword=' + keyword;
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', url, true);
                            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                            displayTranslationMemory(response);
                }
            };
                            xhr.send();

                            // ����ʵ�����������Ӧ�Ĳ���
                            console.log('�����������⣬�ؼ��֣�' + keyword);
        }

                            // �༭�������⺯��ʾ��
                            function editTranslationMemory(id) {
            // ʹ��Ajax������API�༭��������
            // �滻�����URLΪʵ�ʵĺ��API��ַ����id��Ϊ�������ݸ����
            var url = 'https://api.example.com/translation-memory/' + id + '/edit';
                            var xhr = new XMLHttpRequest();
                            xhr.open('PUT', url, true);
                            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                                // �༭�ɹ�������ʵ�����������Ӧ�Ĳ���
                                console.log('�༭��������ɹ�');
                }
            };
                            xhr.send();
        }

                            // �����������⺯��ʾ��
                            function exportTranslationMemory(id) {
            // ʹ��Ajax������API������������
            // �滻�����URLΪʵ�ʵĺ��API��ַ����id��Ϊ�������ݸ����
            var url = 'https://api.example.com/translation-memory/' + id + '/export';
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', url, true);
                            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // ��ȡ���������ݣ�����ʵ�����������Ӧ�Ĳ���
                    var exportedData = xhr.responseText;
                            console.log('������������ɹ�');
                            console.log('���������ݣ�', exportedData);
                }
            };
                            xhr.send();
        }

                            // ���뷭�����⺯��ʾ��
                            function importTranslationMemory() {
            // ʹ��Ajax������API���뷭������
            // �滻�����URLΪʵ�ʵĺ��API��ַ
            var url = 'https://api.example.com/translation-memory/import';
                            var xhr = new XMLHttpRequest();
                            xhr.open('POST', url, true);
                            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                                // ����ɹ�������ʵ�����������Ӧ�Ĳ���
                                console.log('���뷭������ɹ�');
                }
            };
                            xhr.send();

                            // ����ʵ�����������Ӧ�Ĳ���
                            console.log('���뷭������');
        }
                        </script>
</body>
</html>


