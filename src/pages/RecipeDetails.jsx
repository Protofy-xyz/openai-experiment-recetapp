// src/pages/RecipeDetails.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Container } from '@mui/material';


function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRecipe(docSnap.data());
      }
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    let interval = null;
    if (timer) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setTimer(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!timer && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, timeLeft]);

  const startTimer = (duration) => {
    setTimeLeft(duration * 60); // Convertir minutos a segundos
    setTimer(true);
  };

  if (!recipe) {
    return <CircularProgress />;
  }

  const steps = recipe.steps.sort((a, b) => a.order - b.order);
  const currentStep = steps[currentStepIndex];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        {recipe.name}
      </Typography>
      {recipe.imageUrl && (
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', marginBottom: '20px' }}
      />
    )}
      <Typography variant="h6" gutterBottom>
        Paso {currentStep.order}: {currentStep.description}
      </Typography>
      <Box my={2}>
        <Button
          variant="contained"
          onClick={() => startTimer(currentStep.duration)}
        >
          Iniciar Temporizador ({currentStep.duration} min)
        </Button>
      </Box>
      {timer && (
        <Typography variant="h5" gutterBottom>
          Tiempo restante: {Math.floor(timeLeft / 60)}:
          {("0" + (timeLeft % 60)).slice(-2)} minutos
        </Typography>
      )}
      <Box mt={2}>
        <Button
          variant="outlined"
          onClick={() => setCurrentStepIndex((prev) => prev - 1)}
          disabled={currentStepIndex === 0}
        >
          Anterior
        </Button>
        <Button
          variant="outlined"
          onClick={() => setCurrentStepIndex((prev) => prev + 1)}
          disabled={currentStepIndex === steps.length - 1}
          style={{ marginLeft: "10px" }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
    </Container>

  );
}

export default RecipeDetails;
