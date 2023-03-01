const templateSelect = document.getElementById('template_id');
const text0Input = document.getElementById('text0');
const text1Input = document.getElementById('text1');
const form = document.querySelector('form');
const result = document.getElementById('result');

fetch('https://api.imgflip.com/get_memes')
  .then(response => response.json())
  .then(response => {
    response.data.memes.forEach(meme => {
      const option = document.createElement('option');
      option.value = meme.id;
      option.innerText = meme.name;
      templateSelect.appendChild(option
        