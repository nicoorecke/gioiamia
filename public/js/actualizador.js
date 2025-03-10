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
                    <input type="number" id="precio-${producto.id}" value="${producto.precio}">
                `;
                listaProductos.appendChild(divProducto);
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));

    // Manejar la actualización de precios
    botonActualizar.addEventListener("click", () => {
        const nuevosPrecios = [];
        document.querySelectorAll(".producto").forEach(div => {
            const input = div.querySelector("input");
            const id = input.id.split("-")[1];
            const precio = parseFloat(input.value);
            nuevosPrecios.push({ id: parseInt(id), precio });
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