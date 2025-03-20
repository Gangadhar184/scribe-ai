//initialize the model- Gemini SDK
// require("dotenv").config();

import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI("AIzaSyDCLZApat0J1hZw087e64JnIWtsSq8cRuY");

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//we have to write the function to generate text from AI
async function generateTextFromModel(prompt) {
  try {
    if(!model) {
      throw new Error("model initialization failed");
    }
    console.log("prompt:", prompt);
    const result = await model.generateContent([prompt]);
    console.log("response: ", result);
    const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
if (!responseText) {
    throw new Error("AI response is undefined.");
}
return responseText;
  } catch (error) {
    console.error("Error generating text: ", error);
    return null;
  }
}
export default generateTextFromModel;
