
# RecetApp 🍳

**RecetApp** es un prototipo experimental que utiliza OpenAI para generar recetas automáticamente y permite consumirlas mediante una interfaz sencilla. Este proyecto se desarrolló copiando y pegando código desde ChatGPT como experimento, por lo que **puede contener errores**.

## 🚀 Configuración y Arranque

### 1. Preparar Firebase
Si deseas integrar Firebase, agrega la configuración necesaria en el archivo `src/firebase.js`. Por ejemplo:

```javascript
// src/firebase.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export default firebaseConfig;
```

### 2. Configurar la clave de OpenAI
Agrega tu clave de OpenAI en un archivo `.env` dentro de la carpeta `server`. Crea el archivo `server/.env` con el siguiente contenido:

```env
OPENAI_TOKEN=your_openai_api_key_here
```

### 3. Instalar dependencias
Ejecuta los siguientes comandos para instalar las dependencias en ambas carpetas:

```bash
# Instalar dependencias del proyecto principal
npm install

# Cambiar a la carpeta del servidor
cd server

# Instalar dependencias del servidor
npm install
```

### 4. Iniciar la aplicación
Ejecuta el siguiente comando en ambas carpetas para arrancar la aplicación y el servidor:

```bash
# En la carpeta principal
npm start

# En la carpeta del servidor
cd server
npm start
```

### Resultado
La aplicación estará lista para ser utilizada. Podrás generar recetas automáticamente con OpenAI y visualizarlas en la interfaz. **Recuerda que es un prototipo y puede contener errores.**

---

## 🛠️ Notas del desarrollo
Este proyecto fue desarrollado como un experimento utilizando ChatGPT. **Todo el código fue generado mediante copias y pegas desde ChatGPT**, por lo que:
- No garantiza un comportamiento completamente estable.
- Puede contener errores o no estar optimizado.

Si encuentras problemas o mejoras, ¡siéntete libre de contribuir o ajustarlo a tus necesidades!

---

¡Diviértete creando recetas! 🎉
