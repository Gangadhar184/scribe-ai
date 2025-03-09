document.addEventListener("DOMContentLoaded", () => {
    // Handle word slider updates in landing page
    const wordSlider = document.getElementById('word-slider');
    const wordCountDisplay = document.getElementById('word-count');

    if (wordSlider && wordCountDisplay) {
        wordSlider.addEventListener('input', () => {
            wordCountDisplay.textContent = wordSlider.value;
        });
    }

    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize Quill editor
    const quill = new Quill("#editor", {
        theme: "snow",
    });

    // Handle dropdown selection updates
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const button = dropdown.querySelector(".dropdown-toggle");
        const items = dropdown.querySelectorAll(".dropdown-item");

        if (button && items.length > 0) {
            items.forEach((item) => {
                item.addEventListener("click", (e) => {
                    e.preventDefault();
                    button.innerHTML = item.innerHTML; 
                }); 
            });
        }
    }); 
});
// when i click on scribe for me btn the data shouuld be generated according the context and keywords i selected in dropdown
const scribeBtn = document.getElementById('start-scribing');
scribeBtn.addEventListener('click', async() => {
    const language = document.getElementById("dropdownLanguage").innerText.trim();
    const tone = document.getElementById("dropdownTone").innerText.trim();
    const useCase = document.getElementById("dropdownUseCase").innerText.trim();
    const keyword = document.getElementById("keywords").value.trim();

    if(!keyword){
        alert("Please enter the context related keywords");
        return;
    }

    //then here we have to send data to ai model 
    

    //then we have to render the content in quill text editor
    
})
