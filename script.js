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
