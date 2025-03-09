document.addEventListener("DOMContentLoaded", () => {
    fetch("/productos")
        .then(response => response.json())
        .then(data => {
            const listaProductos = document.getElementById("lista-productos");
            data.forEach(producto => {
                const divProducto = document.createElement("div");
                divProducto.className = "producto";
                divProducto.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                `;
                listaProductos.appendChild(divProducto);
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));
});