import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

if (!CLAUDE_API_KEY) {
    console.error("Error: CLAUDE_API_KEY is not set!");
    process.exit(1);
}

app.post("/api/moodbuy", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    try {
        const response = await fetch("https://api.anthropic.com/v1/complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": CLAUDE_API_KEY
            },
            body: JSON.stringify({
                model: "claude-v1",
                prompt: message,
                max_tokens_to_sample: 300
            })
        });

        const data = await response.json();
        const aiResponse = data.completion || data.text || "No response from Claude";
        res.json({ completion: aiResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to call Claude API" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
