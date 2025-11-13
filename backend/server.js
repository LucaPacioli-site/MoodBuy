import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/mood", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await fetch("https://api.anthropic.com/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY
      },
      body: JSON.stringify({
        model: "claude-2",
        prompt: `You are MoodBuy AI. Based on this user input, suggest 6 items for each category: Cravings, OOTD, Concert, Travel:\n"${prompt}"\nReturn them in a clear, structured list.`,
        max_tokens_to_sample: 500,
        stop_sequences: ["\n\n"]
      })
    });

    const data = await response.json();
    res.json({ recommendations: data.completion });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
