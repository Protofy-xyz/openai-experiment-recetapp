// src/pages/AddRecipe.jsx
import React, { useState } from "react";
import { Container } from '@mui/material';

import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";



function AddRecipe() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([
    { description: "", duration: 0 },
  ]);
  const navigate = useNavigate();

  const handleAddStep = () => {
    setSteps([...steps, { description: "", duration: 0 }]);
  };

  const handleRemoveStep = (index) => {
    const newSteps = steps.filter((_, idx) => idx !== index);
    setSteps(newSteps);
  };

  const handleChangeStep = (index, field, value) => {
    const newSteps = steps.map((step, idx) =>
      idx === index ? { ...step, [field]: value } : step
    );
    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepsWithOrder = steps.map((step, index) => ({
      ...step,
      order: index + 1,
    }));
    await addDoc(collection(db, "recipes"), {
      name,
      description,
      steps: stepsWithOrder,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Añadir Nueva Receta
      </Typography>
      <TextField
        label="Nombre de la Receta"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Descripción"
        fullWidth
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <Typography variant="h5" gutterBottom mt={2}>
        Pasos
      </Typography>
      {steps.map((step, index) => (
        <Box key={index} mb={2}>
          <TextField
            label={`Descripción del Paso ${index + 1}`}
            fullWidth
            required
            value={step.description}
            onChange={(e) =>
              handleChangeStep(index, "description", e.target.value)
            }
            margin="normal"
          />
          <TextField
            label="Duración (minutos)"
            type="number"
            fullWidth
            required
            value={step.duration}
            onChange={(e) =>
              handleChangeStep(index, "duration", e.target.value)
            }
            margin="normal"
          />
          <IconButton
            aria-label="remove step"
            onClick={() => handleRemoveStep(index)}
          >
            <RemoveCircleIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={handleAddStep}
      >
        Añadir Paso
      </Button>
      <Box mt={3}>
        <Button type="submit" variant="contained" color="secondary">
          Guardar Receta
        </Button>
      </Box>
    </Box>
    </Container>
  );
}

export default AddRecipe;
