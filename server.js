const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta para cargar productos desde el JSON
app.get("/productos", (req, res) => {
    fs.readFile("productos.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});