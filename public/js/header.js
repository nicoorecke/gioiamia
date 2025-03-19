class HeaderComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header>
          <div class="loguito">
            <img src="/assets/Logo.png" alt="Logo de Gioia Mia">
          </div>
          <h1>GIOIA MIA</h1>
          <h2>Catering y Eventos</h2>
          <nav>
            <ul class="menu">
              <li><a href="/">Inicio</a></li>
              <li class="submenu">
                <a href="#" onclick="return false;">Catálogo</a>
                <ul class="dropdown">
                  <li><a href="menu-postres">Postres</a></li>
                  <li><a href="menu-box">Box Regalo</a></li>
                  <li><a href="menu-bandejas">Bandejitas</a></li>
                  <li><a href="menu-desayunos">Desayunos</a></li>
                  <li><a href="menu-picadas">Picadas</a></li>
                  <li><a href="menu-congelados">Congelados</a></li>
                </ul>
              </li>
              <li><a href="catering">Catering</a></li>
              <li><a href="contacto">Contacto</a></li>
            </ul>
          </nav>
        </header>
      `;
    }
  }
  
  // Registramos el componente con el nombre personalizado
  customElements.define('header-component', HeaderComponent);
  