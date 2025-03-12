//initialize the model- Gemini SDK
// require("dotenv").config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//we have to write the function to generate text from AI
async function generateTextFromModel(prompt) {
  try {
    const result = await model.generateContent([prompt]);
    return result.response.text();
  } catch (error) {
    console.error("Error generating text: ", error);
    return null;
  }
}
export default generateTextFromModel;
