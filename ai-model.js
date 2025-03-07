//initialize the model
const {GoogleGenerativeAI} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI();//api key
const model = genAI.getGenerativeModel({model : "gemini-2.0-flash-exp"});

//prompt

const prompt = " "; 
const informationData = {
    
}
const result = await model.generateContent([prompt, informationData]);
console.log(result.response.text());
