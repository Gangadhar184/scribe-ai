//initialize the model- Gemini SDK

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(); //api key

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

//prompt for getting the result

const prompt = " ";

// const informationData = {

// }
const result = await model.generateContent([prompt]);
console.log(result.response.text());
