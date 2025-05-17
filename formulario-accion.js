class FormularioAccion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <form id="formulario">
        <label for="precio">Nuevo precio:</label>
        <input type="number" id="precio" name="precio" min="0" step="0.01" required />
        <button type="submit">Actualizar Precio</button>
      </form>

      <style>
        form {
          max-width: 500px;
          margin: 0 auto 30px auto;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
        }
        label {
          font-weight: bold;
          color: #333333;
        }
        input[type="number"] {
          padding: 5px 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100px;
          box-sizing: border-box;
        }
        button {
           background-color: #e0e0e0;
           color: #333;
           border: 1px solid #ccc;
           padding: 8px 15px;
           font-size: 1rem;
           border-radius: 4px;
           cursor: pointer;
           transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #45a049;
        }
      </style>
    `;

    this.shadowRoot.getElementById('formulario').addEventListener('submit', (e) => {
      e.preventDefault();
      const nuevoPrecio = this.shadowRoot.getElementById('precio').value;
      if (nuevoPrecio !== '') {
        const componente = document.querySelector('mi-componente');
        if (componente) {
          componente.setAttribute('precio', nuevoPrecio);
        }
      }
    });
  }
}

customElements.define('formulario-accion', FormularioAccion);
