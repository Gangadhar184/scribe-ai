import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import generateTextFromModel from "./ai-model.js";

const app = express();

//Middleware for sec
app.use(bodyParser.json());
app.use(cors());

//post api to generate text
app.post("/generate-text", async (req, res) => {
  console.log("received req body : ", req.body);
  const { prompt } = req.body;
  try {
    const generatedText = await generateTextFromModel(prompt);
    console.log("generated text : ", generatedText);
    if (!generatedText) {
      return res.status(500).json({ error: "Failed to generate text" });
  }
    res.json({ text: generatedText });
    // console.log(req.json())
  } catch (error) {
    console.log("Error in generating content: ", error);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
