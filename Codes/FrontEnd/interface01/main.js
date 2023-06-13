const translationMemoryButton = document.querySelector('.menu-wrapper .navigation li:nth-child(3) a');
const terminologyButton = document.querySelector('.menu-wrapper .navigation li:nth-child(2) a');

translationMemoryButton.addEventListener('click', () => {
  // 发送获取翻译记忆库内容的请求
  fetch('/api/translation memory')
    .then(response => response.json())
    .then(data => {
      // 处理响应数据
      console.log(data);
      // 在这里操作翻译记忆库的内容
    })
    .catch(error => {
      // 处理请求错误
      console.error('请求错误:', error);
    });
});

terminologyButton.addEventListener('click', () => {
  // 发送获取术语库内容的请求
  fetch('/api/terminology')
    .then(response => response.json())
    .then(data => {
      // 处理响应数据
      console.log(data);
      // 在这里操作术语库的内容
    })
    .catch(error => {
      // 处理请求错误
      console.error('请求错误:', error);
    });
});

const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('file', file);

  fetch('/api/files/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        const fileId = data.fileId;
        // 执行其他逻辑
      } else {
        console.error('文件上传失败:', data.message);
      }
    })
    .catch(error => {
      console.error('请求错误:', error);
    });
});