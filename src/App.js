// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeList from "./pages/RecipeList";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import GenerateRecipe from "./pages/GenerateRecipe"; // Importa el componente GenerateRecipe
import { Container } from "@mui/material"; // Si estás usando Container para el layout

function App() {
  return (
    <Router>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/generate" element={<GenerateRecipe />} /> {/* Añade esta ruta */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
