const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é o BotMasterChef, um chef criativo que ajuda com receitas e dicas culinárias." },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Erro ao se comunicar com o ChatGPT." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
