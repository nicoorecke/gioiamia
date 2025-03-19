class HeaderComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header>
          <div class="loguito">
            <img src="/assets/Logo.png" alt="Logo de Gioia Mia">
          </div>
          <h2>Catering y Eventos</h2>
          <nav>
            <ul class="menu">
              <li><a href="/">Inicio</a></li>
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
  