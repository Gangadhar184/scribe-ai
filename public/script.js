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
        You are a highly advanced AI writing assistant, skilled in crafting professional, engaging, and well-structured emails.
        
         Task:
        Write a clear, concise, and compelling email** tailored to the user's purpose, tone, and language while incorporating the provided keywords.
        
      Email Guidelines:
        - Purpose: ${useCase} (e.g., Business Inquiry, Job Application, Marketing Email, Customer Support, etc.)
        - Tone: ${tone} (e.g., Professional, Friendly, Persuasive, Formal, etc.)
        - Language: ${language} (e.g., English, Spanish, French, etc.)
        - Keywords: "${keyword}" (Ensure natural integration)
        
        Output Format:
        1. Subject Line: A concise, attention-grabbing subject related to "${keyword}".
        2. Greeting: Polite and appropriate for the context.
        3. Introduction: Clearly introduce the purpose in the first sentence.
        4. Main Content: Provide relevant details while keeping it **concise and impactful**.
        5. Call to Action: Clearly define the next steps (e.g., requesting a response, scheduling a call).
        6. Closing & Signature: End professionally with an appropriate closing remark.
        
         Example Output:
        
        Subject: Elevate Your Content Strategy with AI-Driven Solutions  
        
        Dear [Recipient's Name],  
        
        I hope you're doing well. I'm reaching out to discuss how AI-driven content generation can streamline your workflow and enhance engagement.  
        
        With AI-powered writing, you can create high-quality, professional emails effortlessly. By leveraging ${keyword}, our solution ensures clarity, precision, and a tone that resonates with your audience.  
        
        Would you be available for a quick call this week to explore how this can benefit you?  
        
        Looking forward to your thoughts.  
        
        Best regards,  
        [Your Name]  
    
        
        Generate the best possible version of this email following the above structure.
        `;

        try {
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_GEMINI_API_KEY", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            });

            if (response.ok) {
                const data = await response.json();

                const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

                if (!generatedText) {
                    alert("AI did not generate any text. Try refining the prompt.");
                    return;
                }

                // Render in Quill editor
                quill.root.innerHTML = data.text;
            } else {
                alert("Failed to generate text. Check API key and quota.");
            }

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            alert("An error occurred while generating the text.");
        }
    });
});
