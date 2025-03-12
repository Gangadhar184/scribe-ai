//initialize the model- Gemini SDK

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDCLZApat0J1hZw087e64JnIWtsSq8cRuY");

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//we have to write the function to generate text from AI
async function generateTextFromModel(prompt) {
        try{
            const result = await model.generateContent([prompt]);
            return result.response.text();
        }
        catch(error){
            console.error("Error generating text: ",error);
            return null;
        }
}
module.exports = { generateTextFromModel };
