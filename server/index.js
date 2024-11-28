// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configurar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
});

// Ruta para generar la receta
app.post('/generate-recipe', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'El prompt es requerido.' });
    }

    // Llamar a la API de OpenAI para generar la receta
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente que genera recetas en formato JSON con el siguiente esquema: {"name": "", "description": "", "steps": [{"order": 1, "description": "", "duration": ""}], "imagePrompt": ""}. No incluyas texto adicional.',
        },
        {
          role: 'user',
          content: `Genera una receta para ${prompt}`,
        },
      ],
    });

    const recipeData = completion.choices[0].message.content.trim();

    // Parsear el JSON obtenido
    let recipe;
    try {
      recipe = JSON.parse(recipeData);
    } catch (error) {
      console.error('Error al parsear el JSON:', error);
      return res.status(500).json({ error: 'Error al generar la receta.' });
    }

    // Generar imagen con DALL·E
    const imageResponse = await openai.images.generate({
      prompt: recipe.imagePrompt || `Plato de ${recipe.name}`,
      n: 1,
      size: '512x512',
    });

    const imageUrl = imageResponse.data[0].url;
    recipe.imageUrl = imageUrl;

    // Devolver la receta completa al frontend
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error al generar la receta:', error);
    res.status(500).json({ error: 'Error al generar la receta.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de Recetapp escuchando en el puerto ${port}`);
});
