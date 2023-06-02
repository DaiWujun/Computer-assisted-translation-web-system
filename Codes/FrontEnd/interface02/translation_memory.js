/*使用Ajax请求后端API，获取翻译记忆库项目信息并显示在表格中。
为编辑、导出等按钮添加点击事件，实现相关功能。
使用Ajax与后端进行交互，实现翻译记忆库的更新、导出等操作。*/
< !DOCTYPE html >
    <html>
        <head>
            <title>翻译记忆库</title>
            <link rel="stylesheet" href="translation_memory.css">
</head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>翻译记忆库</h1>
                        <img src="avatar.png" alt="登录头像">
        </div>
                        <div class="nav">
                            <button id="mainBtn">主页面</button>
                            <button id="translationMemoryBtn" class="active">翻译记忆库</button>
                            <button id="terminologyBtn">术语库</button>
                        </div>
                        <div class="search">
                            <div>
                                <input type="text" id="keywordInput" placeholder="输入项目名称关键字">
                                    <button id="searchBtn">搜索</button>
            </div>
                            </div>
                            <table id="table" class="table">
                                <thead>
                                    <tr>
                                        <th>项目名称</th>
                                        <th>更新时间</th>
                                        <th>编辑</th>
                                        <th>导出</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                </tbody>
                            </table>
                            <div class="actions">
                                <button id="importBtn">导入</button>
                                <button id="exportBtn">导出</button>
                            </div>
                        </div>

                        <script>
        // 获取页面上的元素
                            var mainBtn = document.getElementById('mainBtn');
                            var translationMemoryBtn = document.getElementById('translationMemoryBtn');
                            var terminologyBtn = document.getElementById('terminologyBtn');
                            var keywordInput = document.getElementById('keywordInput');
                            var searchBtn = document.getElementById('searchBtn');
                            var importBtn = document.getElementById('importBtn');
                            var exportBtn = document.getElementById('exportBtn');
                            var tableBody = document.getElementById('tableBody');

                            // 添加点击事件监听器
                            mainBtn.addEventListener('click', navigateToMainPage);
                            terminologyBtn.addEventListener('click', navigateToTerminology);
                            searchBtn.addEventListener('click', searchTranslationMemory);
                            importBtn.addEventListener('click', importTranslationMemory);
                            exportBtn.addEventListener('click', exportTranslationMemory);

                            // 页面加载完成后初始化
                            window.addEventListener('load', function () {
                                loadTranslationMemory();
        });

                            // 导航到主页面函数示例
                            function navigateToMainPage() {
                                // 导航到主页面，根据实际情况进行相应的操作
                                console.log('导航到主页面');
        }

                            // 导航到术语库页面函数示例
                            function navigateToTerminology() {
                                // 导航到术语库页面，根据实际情况进行相应的操作
                                console.log('导航到术语库页面');
        }

                            // 加载翻译记忆库函数示例
                            function loadTranslationMemory() {
            // 使用Ajax请求后端API获取翻译记忆库项目信息
            // 替换下面的URL为实际的后端API地址
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

                            // 显示翻译记忆库项目信息函数示例
                            function displayTranslationMemory(data) {
                                // 清空表格内容
                                tableBody.innerHTML = '';

                            // 遍历数据，生成表格行
                            for (var i = 0; i < data.length; i++) {
                var row = document.createElement('tr');
                            var nameCell = document.createElement('td');
                            var updateTimeCell = document.createElement('td');
                            var editCell = document.createElement('td');
                            var exportCell = document.createElement('td');

                            nameCell.textContent = data[i].name;
                            updateTimeCell.textContent = data[i].updateTime;

                            var editButton = document.createElement('button');
                            editButton.textContent = '编辑';
                            editButton.addEventListener('click', function () {
                                editTranslationMemory(data[i].id);
                });
                            editCell.appendChild(editButton);

                            var exportButton = document.createElement('button');
                            exportButton.textContent = '导出';
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

                            // 搜索翻译记忆库函数示例
                            function searchTranslationMemory() {
            var keyword = keywordInput.value;
                            // 使用Ajax请求后端API搜索翻译记忆库
                            // 替换下面的URL为实际的后端API地址，将关键字作为查询参数传递给后端
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

                            // 根据实际情况进行相应的操作
                            console.log('搜索翻译记忆库，关键字：' + keyword);
        }

                            // 编辑翻译记忆库函数示例
                            function editTranslationMemory(id) {
            // 使用Ajax请求后端API编辑翻译记忆库
            // 替换下面的URL为实际的后端API地址，将id作为参数传递给后端
            var url = 'https://api.example.com/translation-memory/' + id + '/edit';
                            var xhr = new XMLHttpRequest();
                            xhr.open('PUT', url, true);
                            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                                // 编辑成功，根据实际情况进行相应的操作
                                console.log('编辑翻译记忆库成功');
                }
            };
                            xhr.send();
        }

                            // 导出翻译记忆库函数示例
                            function exportTranslationMemory(id) {
            // 使用Ajax请求后端API导出翻译记忆库
            // 替换下面的URL为实际的后端API地址，将id作为参数传递给后端
            var url = 'https://api.example.com/translation-memory/' + id + '/export';
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', url, true);
                            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // 获取导出的数据，根据实际情况进行相应的操作
                    var exportedData = xhr.responseText;
                            console.log('导出翻译记忆库成功');
                            console.log('导出的数据：', exportedData);
                }
            };
                            xhr.send();
        }

                            // 导入翻译记忆库函数示例
                            function importTranslationMemory() {
            // 使用Ajax请求后端API导入翻译记忆库
            // 替换下面的URL为实际的后端API地址
            var url = 'https://api.example.com/translation-memory/import';
                            var xhr = new XMLHttpRequest();
                            xhr.open('POST', url, true);
                            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                                // 导入成功，根据实际情况进行相应的操作
                                console.log('导入翻译记忆库成功');
                }
            };
                            xhr.send();

                            // 根据实际情况进行相应的操作
                            console.log('导入翻译记忆库');
        }
                        </script>
</body>
</html>


