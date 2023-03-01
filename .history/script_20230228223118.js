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
      templateSelect.appendChild(option);
    });

    templateSelect.addEventListener('change', () => {
      const meme = response.data.memes.find(meme => meme.id === templateSelect.value);
      text0Input.placeholder = meme.box_count > 0 ? meme.box_texts[0] : '';
      text1Input.placeholder = meme.box_count > 1 ? meme.box_texts[1] : '';
    });
    });

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const params = new URLSearchParams(formData);

  fetch(`https://api.imgflip.com/caption_image?${params}`)
    .then(response => response.json())
    .then(response => {
      result.src = response.data.url;
    });
}