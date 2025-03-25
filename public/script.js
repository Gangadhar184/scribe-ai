document.addEventListener("DOMContentLoaded", () => {
    const wordSlider = document.getElementById("word-slider");
    const wordCountDisplay = document.getElementById("word-count");

    if (wordSlider && wordCountDisplay) {
        wordSlider.addEventListener("input", () => {
            wordCountDisplay.textContent = wordSlider.value;
        });
    }

    window.quill = new Quill("#editor", { theme: "snow" });
    lucide.createIcons();

    document.querySelectorAll(".dropdown-menu a").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const button = e.target.closest(".dropdown").querySelector(".dropdown-toggle");
            button.innerHTML = e.target.innerHTML;
            button.setAttribute("data-value", e.target.textContent);
        });
    });

    

    const useCasePrompts = {
        "Email": `You are a highly advanced AI writing assistant, skilled in crafting professional, engaging, and well-structured emails.
        
        Task: Write a clear, concise, and compelling email tailored to the user's purpose, tone, and language while incorporating the provided keywords.
        
        Guidelines:
        - Purpose: {useCase}
        - Tone: {tone}
        - Language: {language}
        - Keywords: "{keyword}"
        
        Output Format:
        1. Subject Line: A concise, attention-grabbing subject.
        2. Greeting: Polite and appropriate.
        3. Introduction: Clearly introduce the purpose.
        4. Main Content: Provide relevant details while keeping it concise.
        5. Call to Action: Define the next steps.
        6. Closing & Signature: End professionally.`,

        "Blog Post": `You are an expert AI content creator skilled in crafting compelling blog posts.

        Task: Generate an engaging, well-structured blog post based on the provided keywords and preferences.

        Guidelines:
        - Topic: {keyword}
        - Tone: {tone}
        - Language: {language}
        - Structure: Title, Introduction, Main Points, Conclusion
        - Make it engaging, informative, and optimized for readability.

        Example Output:

        # [Blog Title Related to {keyword}]

        Introduction  
        Provide a compelling introduction that hooks the reader and introduces the topic.

        Main Content 
        - Key point 1  
        - Key point 2  
        - Key point 3  
        Expand on each point with useful insights, examples, or facts.

        Conclusion 
        Summarize the topic and provide a final thought or call to action.`,

        "Video Description": `You are a skilled AI writing assistant specializing in generating compelling YouTube video descriptions.

        Task: Write an engaging and SEO-friendly video description incorporating the provided keywords.

        Guidelines:
        - Topic: {keyword}
        - Tone: {tone}
        - Language: {language}
        - Include an attention-grabbing intro, video summary, and relevant call to action.

        Example Output:

        [Video Title Related to {keyword}]

        Introduction:
        Write an engaging hook that explains what the video is about.

        Video Summary:
        Provide a concise overview of the key points discussed in the video.

        Call to Action:
        Encourage viewers to like, comment, subscribe, or check out related content.`
    };

    const scribeBtn = document.getElementById("start-scribing");
    scribeBtn.addEventListener("click", async () => {
        const language = document.getElementById("dropdownLanguage").getAttribute("data-value") ;
        const tone = document.getElementById("dropdownTone").getAttribute("data-value") 
        const useCase = document.getElementById("dropdownUseCase").getAttribute("data-value") 
        const keyword = document.getElementById("keywords").value.trim();

        if (!keyword) {
            alert("Please enter the context-related keywords.");
            return;
        }

        let promptTemplate = useCasePrompts[useCase];

        if (!promptTemplate) {
            alert("Invalid use case selected.");
            return;
        }

        const prompt = promptTemplate
            .replace("{useCase}", useCase)
            .replace("{tone}", tone)
            .replace("{language}", language)
            .replace("{keyword}", keyword);

        try {
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDCLZApat0J1hZw087e64JnIWtsSq8cRuY", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            });

            if (response.ok) {
                const data = await response.json();
                const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

                if (!generatedText) {
                    alert("AI did not generate any text. Try refining the prompt.");
                    return;
                }

                quill.root.innerHTML = generatedText;
            } else {
                alert("Failed to generate text. Check API key and quota.");
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            alert("An error occurred while generating the text.");
        }
    });
});
