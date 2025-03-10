const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta para obtener los productos
app.get("/productos", (req, res) => {
    fs.readFile("productos.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para actualizar los precios
app.post("/actualizar-precios", (req, res) => {
    const nuevosPrecios = req.body;

    fs.readFile("productos.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }

        const productos = JSON.parse(data);

        // Actualizar los precios
        nuevosPrecios.forEach(nuevoPrecio => {
            const producto = productos.find(p => p.id === nuevoPrecio.id);
            if (producto) {
                producto.precio = nuevoPrecio.precio;
            }
        });

        // Guardar los cambios en el archivo JSON
        fs.writeFile("productos.json", JSON.stringify(productos, null, 2), err => {
            if (err) {
                return res.status(500).json({ error: "Error al guardar los cambios" });
            }
            res.json({ message: "Precios actualizados correctamente" });
        });
    });
});

// Ruta para la página de actualización
app.get("/actualizador", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "actualizador.html"));
});

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});