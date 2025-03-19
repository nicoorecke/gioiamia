document.addEventListener("DOMContentLoaded", () => {
    fetch("/menus")
        .then(response => response.json())
        .then(data => {
            const listaMenus = document.getElementById("lista-menus");
            data.forEach(menu => {
                const linkMenu = document.createElement("a");
                linkMenu.className = "menucito";
                linkMenu.href = `${menu.link}`;
                linkMenu.innerHTML = `
                    <img src="${menu.imagen}" alt="${menu.nombre}">
                    <div class="contenido">
                        <h3>${menu.nombre}</h3>
                    </div>
                `;

                listaMenus.appendChild(linkMenu);
            });
        })
        .catch(error => console.error("Error al cargar los menus:", error));
});
