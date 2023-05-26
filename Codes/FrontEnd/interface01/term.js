// 跳转到翻译记忆库页面
const tmButton = document.querySelectorAll('.nav li')[1].querySelector('a');
tmButton.addEventListener('click', () => {
  window.location.href = 'translation memory.html';
});

// 跳转到主界面
const mainButton = document.querySelectorAll('.nav li')[0].querySelector('a');
mainButton.addEventListener('click', () => {
  window.location.href = 'main interface.html';
});

// 删除术语记录
const deleteButtons = document.querySelectorAll('.table button:last-of-type');
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  });
});

// 编辑术语记录
const editButtons = document.querySelectorAll('.table button:first-of-type');
editButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.parentNode.parentNode;
    const termCell = row.querySelector('td:first-of-type');
    const translationCell = row.querySelector('td:nth-of-type(2)');
    const termInput = document.createElement('input');
    const translationInput = document.createElement('input');
    termInput.value = termCell.innerText;
    translationInput.value = translationCell.innerText;
    // 替换单元格内容为输入框
    termCell.innerHTML = '';
    termCell.appendChild(termInput);
    translationCell.innerHTML = '';
    translationCell.appendChild(translationInput);
    // 添加保存按钮
    const saveButton = document.createElement('button');
    saveButton.innerText = '保存';
    saveButton.addEventListener('click', () => {
      termCell.innerText = termInput.value;
      translationCell.innerText = translationInput.value;
    });
    row.querySelector('td:last-of-type').appendChild(saveButton);
  });
});

// 添加新术语
const addButton = document.querySelector('.actions button:first-of-type');
const table = document.querySelector('.table tbody');
addButton.addEventListener('click', () => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = '<td contenteditable></td><td contenteditable></td><td><button>编辑</button></td><td><button>删除</button></td>';
  table.appendChild(newRow);

  // 绑定新行的编辑和删除操作
  const editButton = newRow.querySelector('button:first-of-type');
  editButton.addEventListener('click', () => {
    // 编辑操作
  });

  const deleteButton = newRow.querySelector('button:last-of-type');
  deleteButton.addEventListener('click', () => {
    // 删除操作
  });
});

// 导出 CSV
const exportButton = document.querySelector('.actions button:last-of-type');
exportButton.addEventListener('click', () => {
  const table = document.querySelector('.table');
  const rows = table.querySelectorAll('tr');
  let csvContent = 'data:text/csv;charset=utf-8,';

  rows.forEach((row) => {
    const cells = row.querySelectorAll('td');
    const term = cells[0].innerText;
    const translation = cells[1].innerText;
    const csvRow = term + ',' + translation + '\n';
    csvContent += csvRow;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'terms.csv');
  document.body.appendChild(link);
  link.click();
});
