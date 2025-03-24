document.addEventListener("DOMContentLoaded", () => {
    fetch("/productos-picadas")
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

                divProducto.innerHTML = `
                    
                    <div class="contenido">
                        <h3>${producto.nombre}</h3>
                        <div class="descripcion">
                            <p>${producto.descripcion}</p>
                        </div>
                        <img src="${producto.imagen}" alt="${producto.nombre}">
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
