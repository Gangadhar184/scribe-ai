document.addEventListener("DOMContentLoaded", () => {
        
     // Handle word slider updates in landing page
     const wordSlider = document.getElementById('word-slider');
     const wordCountDisplay = document.getElementById('word-count');
 
     if (wordSlider && wordCountDisplay) {
         wordSlider.addEventListener('input', () => {
             wordCountDisplay.textContent = wordSlider.value;
         });
     }
     
        // Initialize Quill editor
        window.quill = new Quill("#editor", { 
            theme: "snow" 
        });
   

    // Initialize Lucide icons
    lucide.createIcons();

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
    const language = document.getElementById("dropdownLanguage").dataset.value || "English";
    const tone = document.getElementById("dropdownTone").dataset.value || "Professional";
    const useCase = document.getElementById("dropdownUseCase").dataset.value || "General";
    const keyword = document.getElementById("keywords").value.trim();


    if(!keyword){
        alert("Please enter the context related keywords");
        return;
    }

    // debugger
    //console.log("Selected values:", {useCase, tone, language, keyword});

    // propmt based on user inputs
    const prompt = `You are an AI email generator specialized in crafting professional, engaging, and effective emails. 
                    
    Your task is to generate a well-structured email based on the user’s inputs.

Email Details:
- Purpose: ${useCase} 
- Tone: ${tone} 
- Language: ${language} 
- Keywords: ${keyword} 

Email Output Guidelines:
Generate an email using the following format based on the context provided:


Subject: [A compelling subject related to ${keyword}]

Dear Hiring Manager,

I hope this email finds you well. I am writing to express my interest in [Job Title] at [Company Name]. With my background in [Your Relevant Skills], I am confident in my ability to contribute to your team.

My experience in [Skill/Project] has allowed me to [Impact]. I am excited about the opportunity to bring my expertise to your company and collaborate with your talented team.

I would love to discuss how my skills align with the role. Please let me know a convenient time to connect.

Best regards, 
[Your Name]  


Generate only the email as per this format. Do not include any explanations or introductions.
`;

//sending prompt to ai model
try {
    const response = await fetch('http://localhost:3000/generate-text', {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({prompt})
    });

    if(response.ok){
        const data = await response.json();
        //console.log("Generated text: ", data.text);

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
