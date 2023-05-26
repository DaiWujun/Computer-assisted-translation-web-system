const translationMemoryButton = document.querySelector('.menu-wrapper .button:nth-child(2)');
const terminologyButton = document.querySelector('.menu-wrapper .button:nth-child(3)');

translationMemoryButton.addEventListener('click', () => {
  window.location.href = 'translation memory.html';
});

terminologyButton.addEventListener('click', () => {
  window.location.href = 'Term store interface.html';
});

const fileInput = document.getElementById('file-input');

document.querySelector('.select-file').addEventListener('click', () => {
  fileInput.click();
});