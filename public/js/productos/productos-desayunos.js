document.addEventListener("DOMContentLoaded", () => {
    fetch("/productos-desayunos")
        .then(response => response.json())
        .then(data => {
            const listaProductos = document.getElementById("lista-productos");
            data.forEach(producto => {
                const divProducto = document.createElement("div");
                divProducto.className = "producto";
                
                // Construimos la sección de precios dinámicamente
                let preciosHTML = `
                    <div class="boton">
                        <span>$${producto.precioGrande.toLocaleString('es-ES')}</span>
                    </div>
                `;

                if (producto.precioChico !== undefined) {
                    preciosHTML += `
                        <div class="boton">
                            <span>$${producto.precioChico.toLocaleString('es-ES')} (${producto.tamañoChico})</span>
                        </div>
                    `;
                }

                divProducto.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="contenido">
                        <h3>${producto.nombre}</h3>
                        <div class="descripcion">
                            <p>${producto.descripcion}</p>
                        </div>
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
