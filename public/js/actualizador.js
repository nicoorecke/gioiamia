document.addEventListener("DOMContentLoaded", () => {
    const listaProductos = document.getElementById("lista-productos");
    const botonActualizar = document.getElementById("actualizar");

    // Cargar los productos
    fetch("/productos")
        .then(response => response.json())
        .then(data => {
            data.forEach(producto => {
                const divProducto = document.createElement("div");
                divProducto.className = "producto";
                divProducto.dataset.id = producto.id; // Guardamos el ID en el dataset

                divProducto.innerHTML = `
                    
                    <span>${producto.nombre}</span>
                    <div class ="inputs">
                    <div></div>
                    <label for="precio-${producto.id}-grande">Grande:</label>
                    <input type="number" id="precio-${producto.id}-grande" value="${producto.precioGrande}">
                    <div></div>

                    ${producto.precioChico !== undefined ? `
                        
                        <label for="precio-${producto.id}-chico">Chico:</label>
                        <input type="number" id="precio-${producto.id}-chico" value="${producto.precioChico}">
                    ` : ""}
                
                    </div>
                `;
                listaProductos.appendChild(divProducto);
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));

    // Manejar la actualización de precios
    botonActualizar.addEventListener("click", () => {
        const nuevosPrecios = [];
        
        document.querySelectorAll(".producto").forEach(div => {
            const id = div.dataset.id;
            const precioGrande = parseFloat(div.querySelector(`#precio-${id}-grande`).value);
            const inputChico = div.querySelector(`#precio-${id}-chico`);
            const precioChico = inputChico ? parseFloat(inputChico.value) : null; // Evitar errores si no existe
            
            const productoActualizado = { id, precioGrande };
            if (precioChico !== null) {
                productoActualizado.precioChico = precioChico;
            }
            
            nuevosPrecios.push(productoActualizado);
        });

        // Enviar datos al servidor
        fetch("/actualizar-precios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevosPrecios)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje);
        })
        .catch(error => console.error("Error al actualizar precios:", error));
    });
});
