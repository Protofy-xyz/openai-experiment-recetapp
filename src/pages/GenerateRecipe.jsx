// src/pages/GenerateRecipe.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

function GenerateRecipe() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate-recipe', {
        prompt: prompt,
      });

      const recipe = response.data;

      // Guardar la receta en Firestore
      await addDoc(collection(db, 'recipes'), {
        name: recipe.name,
        description: recipe.description,
        steps: recipe.steps,
        imageUrl: recipe.imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      navigate('/');
    } catch (error) {
      console.error('Error al generar la receta:', error);
      alert('Hubo un error al generar la receta. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Generar Receta Automáticamente
      </Typography>
      <TextField
        label="¿Qué receta te gustaría generar?"
        fullWidth
        required
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Generar Receta'}
      </Button>
    </Container>
  );
}

export default GenerateRecipe;
