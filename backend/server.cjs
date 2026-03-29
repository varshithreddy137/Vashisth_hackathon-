require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/ai/analyze-image", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); 
    const { image } = req.body;
    console.log("Image Received:",image ? "Yes" : "No");

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: image.split(",")[1],
          mimeType: "image/jpeg",
        },
      },
      `
You are a food safety analyzer.

Respond ONLY in JSON format:
{
  "safety": number (0-100),
  "message": "short explanation"
}
`
    ]);

    const text = result.response.text();
    console.log("AI RAW:", text);

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    }

    if (!parsed) {
      return res.json({
        safety: 70,
        message: "Could not analyze clearly",
      });
    }

    res.json(parsed);

  } catch (err) {
  console.error("FULL ERROR:", err);  // ✅ ADD THIS

  res.status(500).json({
    safety: 60,
    message: "AI failed",
  });
}
});

app.listen(5000, () => {
  console.log(" Server running on http://localhost:5000");
});