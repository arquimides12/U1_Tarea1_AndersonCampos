class FormularioAccion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <form>
        <label for="precio">Nuevo precio:</label>
        <input type="number" id="precio" />
        <slot name="boton-enviar"></slot>
      </form>

      <style>
        form {
          background-color: #fff;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          text-align: center;
        }
        input {
          padding: 5px;
          margin: 10px 0;
          width: 100px;
        }
        label {
          font-weight: bold;
        }
      </style>
    `;

    const form = this.shadowRoot.querySelector('form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nuevoPrecio = this.shadowRoot.querySelector('#precio').value;

      const componente = document.querySelector('mi-componente');
      if (componente) {
        componente.setAttribute('precio', nuevoPrecio);
      }
    });
  }
}

customElements.define('formulario-accion', FormularioAccion);
