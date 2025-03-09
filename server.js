const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 4000; // Puedes cambiar el puerto si es necesario

// Cargar productos desde un JSON
app.get("/productos", (req, res) => {
    fs.readFile("productos.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }
        res.json(JSON.parse(data));
    });
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});
``


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
