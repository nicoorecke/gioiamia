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
                divProducto.innerHTML = `
                    <span>${producto.nombre}</span>
                    <label for="precio-${producto.id}-grande">Precio Grande:</label>
                    <input type="number" id="precio-${producto.id}-grande" value="${producto.precioGrande}">
                    <label for="precio-${producto.id}-chico">Precio Chico:</label>
                    <input type="number" id="precio-${producto.id}-chico" value="${producto.precioChico}">
                `;
                listaProductos.appendChild(divProducto);
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));

    // Manejar la actualización de precios
    botonActualizar.addEventListener("click", () => {
        const nuevosPrecios = [];
        document.querySelectorAll(".producto").forEach(div => {
            const id = div.querySelector("input").id.split("-")[1];
            const precioGrande = parseFloat(div.querySelector(`#precio-${id}-grande`).value);
            const precioChico = parseFloat(div.querySelector(`#precio-${id}-chico`).value);
            nuevosPrecios.push({ id: parseInt(id), precioGrande, precioChico });
        });

        // Enviar la solicitud de actualización
        fetch("/actualizar-precios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevosPrecios),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => console.error("Error al actualizar los precios:", error));
    });
});