// src/components/Navbar.jsx
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Recetapp
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/add">
            Añadir Manualmente
          </Button>
          <Button color="inherit" component={Link} to="/generate">
            Generar Receta
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
