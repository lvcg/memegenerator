// Define variables for meme generator elements
const templateIdSelect = document.getElementById("template_id");
const textTopInput = document.getElementById("text_top");
const textBottomInput = document.getElementById("text_bottom");
const generateMemeButton = document.getElementById("generate_meme");
const memeContainer = document.getElementById("meme_container");

// Populate meme template options
fetch("https://api.imgflip.com/get_memes")
	.then(response => response.json())
	.then(data => {
		const memes = data.data.memes;
		memes.forEach(meme => {
			const option = document.createElement("option");
			option.value = meme.id;
			option.text = meme.name;
			templateIdSelect.appendChild(option);
		});
	});

// Handle form submission and generate meme
generateMemeButton.addEventListener("click", () => {
	const templateId = templateIdSelect.value;
	const textTop = textTopInput.value;
	const textBottom = textBottomInput.value;
	const url = `https://api.imgflip.com/caption_image?template_id=${templateId}&username=<YOUR_USERNAME>&password=<YOUR_PASSWORD>&text0=${textTop}&text1=${textBottom}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			const imageUrl = data.data.url;
			const memeImage = document.createElement("img");
			memeImage.src = imageUrl;
			memeContainer.innerHTML = "";
			memeContainer.appendChild(memeImage);
		})
		.catch(error => {
			console.error(error);
			alert("Error generating meme. Please try again.");
		});
});


