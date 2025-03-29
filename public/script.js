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
      const button = e.target
        .closest(".dropdown")
        .querySelector(".dropdown-toggle");
      button.innerHTML = e.target.innerHTML;
      button.setAttribute("data-value", e.target.textContent);
    });
  });

  const useCasePrompts = {
    Email: `You are an AI writing assistant named Scribe AI. Your goal is to generate high-quality, structured, and engaging emails.
        
            Objective:
            - Craft professional and concise emails.
            - Ensure clarity, engagement, and structured formatting.
            
            Constraints:
            1. Maintain a professional and user-specific tone.
            2. Ensure the writing aligns with the selected purpose, tone, and language.
            3. Avoid unnecessary details or vague content.
        
            Tone: {tone}
            Language: {language}
            Purpose: {useCase}
            Keywords: "{keyword}"
        
            Expected Output Format:
            Subject: [Engaging subject line]
            Greeting: [Polite and professional greeting]
            Introduction: [Clear purpose of the email]
            Main Content: [Concise details aligned with the objective]
            Call to Action: [Next steps or request]
            Closing & Signature: [Professional closing]`,

    "Blog post": `You are an AI content creator skilled in crafting compelling blog posts.
        
            Objective:
            - Generate engaging and well-structured blog posts.
            - Adapt content based on the provided topic, tone, and language.
            
            Constraints:
            1. Maintain a structured format with a clear introduction, main content, and conclusion.
            2. Ensure readability and engagement.
            3. Avoid generic content—provide valuable insights.
        
            Tone: {tone}
            Language: {language}
            Topic: {keyword}
        
            Expected Output Format:
            Title: [Compelling blog title]
            Introduction: [Hook the reader and introduce the topic]
            Main Content: [Structured key points with insights]
            Conclusion: [Summarize and provide final thought or CTA]`,

    "Video Description": `You are an AI assistant specializing in writing compelling and SEO-friendly video descriptions.
        
            Objective:
            - Write a concise yet engaging video description.
            - Ensure it is optimized for YouTube SEO.
        
            Constraints:
            1. Provide a clear and structured format.
            2. Include relevant keywords for discoverability.
            3. Keep it concise and engaging.
        
            Tone: {tone}
            Language: {language}
            Topic: {keyword}
        
            Expected Output Format:
            Title: [Relevant and catchy]
            Introduction: [Briefly explain the video’s purpose]
            Summary: [Key points covered in the video]
            Call to Action: [Encourage engagement]`,
  };

  const scribeBtn = document.getElementById("start-scribing");
  scribeBtn.addEventListener("click", async () => {
    const language = document
      .getElementById("dropdownLanguage")
      .getAttribute("data-value");
    const tone = document
      .getElementById("dropdownTone")
      .getAttribute("data-value");
    const useCase = document
      .getElementById("dropdownUseCase")
      .getAttribute("data-value");
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
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDCLZApat0J1hZw087e64JnIWtsSq8cRuY",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const generatedText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (!generatedText) {
          alert("AI did not generate any text. Try refining the prompt.");
          return;
        }

        quill.root.innerHTML = marked.parse(generatedText);
        // const htmlContent = marked.parse(generatedText);

        // // Convert HTML to Quill's Delta format
        // const delta = quill.clipboard.convert(htmlContent);

        // // Insert the formatted content into Quill
        // quill.setContents(delta);
        // quill.setContents([{ insert: generatedText }]);
      } else {
        alert("Failed to generate text. Check API key and quota.");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      alert("An error occurred while generating the text.");
    }
  });
});
