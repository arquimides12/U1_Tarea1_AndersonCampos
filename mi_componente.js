class MiComponente extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['precio'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'precio') {
      const precioElemento = this.shadowRoot.querySelector('.precio');
      if (precioElemento) {
        precioElemento.textContent = `Precio inicial: $${newValue}`;
      }
    }
  }

  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <section class="card">
        <h2><slot name="titulo"></slot></h2>
        <p><slot name="contenido"></slot></p>
        <p class="precio">Precio inicial: $${this.getAttribute('precio') || '0.00'}</p>
      </section>
      ${this.getStyles()}
    `;
    return template;
  }

  getStyles() {
    return `
      <style>
        .card {
          background-color: #333; /* color oscuro para que contraste con el blanco */
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 8px rgba(255, 0, 0, 0.7);
          max-width: 500px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
          color: white; /* texto en blanco */
          text-align: center;
        }
        h2 {
          font-size: 2rem;
          margin-bottom: 15px;
          font-weight: bold;
          color: white; /* asegurar que el texto sea blanco */
        }
        p {
          font-size: 1rem;
          margin: 10px 0;
          color: white;
        }
        .precio {
          font-weight: bold;
          margin-top: 15px;
          color: #ffdddd;
        }
      </style>
    `;
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}

customElements.define('mi-componente', MiComponente);
