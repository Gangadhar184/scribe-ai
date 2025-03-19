document.addEventListener("DOMContentLoaded", () => {
    // Handle word slider updates
    const wordSlider = document.getElementById("word-slider");
    const wordCountDisplay = document.getElementById("word-count");

    if (wordSlider && wordCountDisplay) {
        wordSlider.addEventListener("input", () => {
            wordCountDisplay.textContent = wordSlider.value;
        });
    }

    // Initialize Quill editor
    window.quill = new Quill("#editor", { theme: "snow" });

    // Initialize Lucide icons
    lucide.createIcons();

    // Handle dropdown selection updates
    document.querySelectorAll(".dropdown-menu a").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const button = e.target.closest(".dropdown").querySelector(".dropdown-toggle");
            button.innerHTML = e.target.innerHTML;
            button.setAttribute("data-value", e.target.textContent); 
        });
    });

    // Handle "Scribe for Me" button click
    const scribeBtn = document.getElementById("start-scribing");
    scribeBtn.addEventListener("click", async () => {

        const language = document.getElementById("dropdownLanguage").getAttribute("data-value") || "English";
        const tone = document.getElementById("dropdownTone").getAttribute("data-value") || "Professional";
        const useCase = document.getElementById("dropdownUseCase").getAttribute("data-value") || "General";
        const keyword = document.getElementById("keywords").value.trim();

    
        if (!keyword) {
            alert("Please enter the context-related keywords.");
            return;
        }

        console.log("Use Case:", useCase);
        console.log("Tone:", tone);
        console.log("Language:", language);

        // Generate AI prompt
        const prompt = `
        You are an AI writing assistant specializing in creating professional, engaging, and effective content.
        
        Your task is to generate content based on the user's inputs.

        Details:
        - Purpose: ${useCase}
        - Tone: ${tone}
        - Language: ${language}
        - Keywords: ${keyword}

        Generated Output Format:
        - Write a structured email using the provided keywords and purpose.
        - Maintain a ${tone} tone in the email.
        - Ensure clarity and professionalism.
        - Provide a compelling subject line related to ${keyword}.
        - Keep the email concise and impactful.

        Generate the best possible version of the email.
        `;

        try {
            const response = await fetch("http://localhost:3000/generate-text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (response.ok) {
                const data = await response.json();

                if (!data.text || data.text.trim() === "") {
                    console.error("AI returned an empty response.");
                    alert("AI model did not generate any text. Try refining the prompt.");
                    return;
                }

                // Render in Quill editor
                quill.root.innerHTML = data.text;
            } else {
                console.error("Failed to generate text, status:", response.status);
                alert("Failed to generate text. Please try again.");
            }
        } catch (error) {
            console.error("Error calling AI API:", error);
            alert("An error occurred while generating the text. Please check your backend.");
        }
    });
});
