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
app.get("/productos-postres", (req, res) => {
    fs.readFile("productos-postres.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para obtener los productos
app.get("/productos-congelados", (req, res) => {
  fs.readFile("productos-congelados.json", "utf8", (err, data) => {
      if (err) {
          return res.status(500).json({ error: "Error al leer el archivo" });
      }
      res.json(JSON.parse(data));
  });
});

// Ruta para obtener los productos
app.get("/productos-desayunos", (req, res) => {
  fs.readFile("productos-desayunos.json", "utf8", (err, data) => {
      if (err) {
          return res.status(500).json({ error: "Error al leer el archivo" });
      }
      res.json(JSON.parse(data));
  });
});

// Ruta para obtener los productos
app.get("/menus", (req, res) => {
  fs.readFile("menus.json", "utf8", (err, data) => {
      if (err) {
          return res.status(500).json({ error: "Error al leer el archivo" });
      }
      res.json(JSON.parse(data));
  });
});

// Rutas para obtener los productos
const tiposProductos = ["postres", "congelados", "desayunos", "box", "bandejas", "picadas"];

tiposProductos.forEach(tipo => {
    app.get(`/productos-${tipo}`, (req, res) => {
        fs.readFile(`productos-${tipo}.json`, "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error al leer el archivo" });
            }
            res.json(JSON.parse(data));
        });
    });

    app.post(`/actualizar-precios-${tipo}`, (req, res) => {
        const nuevosPrecios = req.body;

        fs.readFile(`productos-${tipo}.json`, "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error al leer el archivo" });
            }

            let productos = JSON.parse(data);

            nuevosPrecios.forEach(nuevoPrecio => {
                const producto = productos.find(p => p.id == nuevoPrecio.id);
                if (producto) {
                    producto.precioGrande = nuevoPrecio.precioGrande;
                    if (nuevoPrecio.precioChico !== undefined) {
                        producto.precioChico = nuevoPrecio.precioChico;
                    }
                }
            });

            fs.writeFile(`productos-${tipo}.json`, JSON.stringify(productos, null, 4), "utf8", (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error al guardar los cambios" });
                }
                res.json({ mensaje: "Precios actualizados correctamente" });
            });
        });
    });
});

// Ruta para la página de actualización
app.get("/actualizador", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "actualizador.html"));
});



// Configurar rutas sin la extensión .html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  
  app.get('/menu-postres', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu-postres.html'));
  });
  
  app.get('/menu-box', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu-box.html'));
  });
  
  app.get('/menu-bandejas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu-bandejas.html'));
  });
  
  app.get('/menu-desayunos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu-desayunos.html'));
  });
  
  app.get('/menu-picadas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu-picadas.html'));
  });
  
  app.get('/menu-congelados', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu-congelados.html'));
  });
  
  app.get('/catering', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'catering.html'));
  });
  
  app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
  });

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});