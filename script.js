const wordSlider = document.getElementById('word-slider');
const wordCountDisplay = document.getElementById('word-count');
wordSlider.addEventListener('input', ()=>{
    wordCountDisplay.textContent = wordSlider.value;
})
