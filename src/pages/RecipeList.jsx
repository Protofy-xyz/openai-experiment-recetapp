// src/pages/RecipeList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Container } from '@mui/material';


function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "recipes", id));
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Recetas
      </Typography>
      <List>
        {recipes.map((recipe) => (
          <ListItem
            button
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(recipe.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={recipe.name}
              secondary={recipe.description}
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/add")}
      >
        Añadir Nueva Receta
      </Button>
      </Container>
  );
}

export default RecipeList;
