// 删除术语记录
const deleteButtons = document.querySelectorAll('.table button:last-of-type');
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.parentNode.parentNode;
    const termId = row.dataset.termId; // 获取术语ID
    deleteTerm(termId, row);
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
      const termId = row.dataset.termId; // 获取术语ID
      const updatedTerm = {
        english: termInput.value,
        chinese: translationInput.value
      };
      updateTerm(termId, updatedTerm, row);
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
    const termCell = newRow.querySelector('td:first-of-type');
    const translationCell = newRow.querySelector('td:nth-of-type(2)');
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
      const newTerm = {
        english: termInput.value,
        chinese: translationInput.value
      };
      addTerm(newTerm, newRow);
    });
    newRow.querySelector('td:last-of-type').appendChild(saveButton);
  });

  const deleteButton = newRow.querySelector('button:last-of-type');
  deleteButton.addEventListener('click', () => {
    // 删除操作
    table.removeChild(newRow);
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

// 获取用户术语列表
axios.get('/api/terms')
  .then((response) => {
    const { success, message, terms } = response.data;
    if (success) {
      // 处理获取到的术语列表
      displayTerms(terms);
    } else {
      console.error(message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// 按关键词搜索术语
function searchTerms(keyword) {
  axios.get(`/api/terms/search?keyword=${keyword}`)
    .then((response) => {
      const { success, message, terms } = response.data;
      if (success) {
        // 处理搜索到的术语列表
        displayTerms(terms);
      } else {
        console.error(message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// 删除术语
function deleteTerm(termId, row) {
  axios.delete(`/api/terms/${termId}`)
    .then((response) => {
      const { success, message } = response.data;
      if (success) {
        table.removeChild(row);
        console.log('术语删除成功');
      } else {
        console.error(message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// 添加术语
function addTerm(term, row) {
  axios.post('/api/terms', term)
    .then((response) => {
      const { success, message } = response.data;
      if (success) {
        row.dataset.termId = response.data.termId; // 设置新添加术语的ID
        console.log('术语添加成功');
      } else {
        console.error(message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// 编辑术语
function updateTerm(termId, updatedTerm, row) {
  axios.put(`/api/terms/${termId}`, updatedTerm)
    .then((response) => {
      const { success, message } = response.data;
      if (success) {
        console.log('术语更新成功');
      } else {
        console.error(message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// 显示术语列表
function displayTerms(terms) {
  const table = document.querySelector('.table tbody');
  table.innerHTML = '';

  terms.forEach((term) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${term.english}</td><td>${term.chinese}</td><td><button>编辑</button></td><td><button>删除</button></td>`;
    newRow.dataset.termId = term.termId; // 设置术语的ID
    table.appendChild(newRow);

    const editButton = newRow.querySelector('button:first-of-type');
    editButton.addEventListener('click', () => {
      // 编辑操作
      const termCell = newRow.querySelector('td:first-of-type');
      const translationCell = newRow.querySelector('td:nth-of-type(2)');
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
        const termId = newRow.dataset.termId; // 获取术语ID
        const updatedTerm = {
          english: termInput.value,
          chinese: translationInput.value
        };
        updateTerm(termId, updatedTerm, newRow);
      });
      newRow.querySelector('td:last-of-type').appendChild(saveButton);
    });

    const deleteButton = newRow.querySelector('button:last-of-type');
    deleteButton.addEventListener('click', () => {
      // 删除操作
      const termId = newRow.dataset.termId; // 获取术语ID
      deleteTerm(termId, newRow);
    });
  });
}
