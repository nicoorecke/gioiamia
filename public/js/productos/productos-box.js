document.addEventListener("DOMContentLoaded", () => {
    fetch("/productos-box")
        .then(response => response.json())
        .then(data => {
            const listaProductos = document.getElementById("precio-box");
            data.forEach(producto => {
                const divProducto = document.createElement("div");
                divProducto.className = "producto";
                
                // Construimos la sección de precios dinámicamente
                let preciosHTML = `
                    <div class="boton">
                        <span>$${producto.precioGrande}</span>
                    </div>
                `;

                divProducto.innerHTML = `
                    <div class="precio-box">
                        <div class="precios">
                            ${preciosHTML}
                        </div>
                    </div>
                `;

                listaProductos.appendChild(divProducto);
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));
});
