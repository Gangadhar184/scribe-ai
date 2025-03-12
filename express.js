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
  const { prompt } = req.body;
  try {
    const generatedText = await generateTextFromModel(prompt);
    res.json({ text: generatedText });
  } catch (error) {
    console.log("Error in generating content: ", error);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
