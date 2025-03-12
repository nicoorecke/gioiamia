document.addEventListener("DOMContentLoaded", () => {
    fetch("/productos")
        .then(response => response.json())
        .then(data => {
            const listaProductos = document.getElementById("lista-productos");
            data.forEach(producto => {
                const divProducto = document.createElement("div");
                divProducto.className = "producto";
                divProducto.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="contenido">
                        
                        <h3>${producto.nombre}</h3>
                        
                        <div class="descripcion">${producto.descripcion}</div>
                        <div class="precios">
                            <span>${producto.tamañoGrande}: $${producto.precioGrande}</span>
                            <span>${producto.tamañoChico}: $${producto.precioChico}</span>
                        </div>
                    </div>
                    
                `;
                listaProductos.appendChild(divProducto);
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));
});