// Componente modularizado espe-modal con <template>, Shadow DOM, slots y evento personalizado

class EspeModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Encapsula el DOM
    this.shadowRoot.appendChild(this.template.content.cloneNode(true)); // Renderiza el template

    // Referencia al botón dentro del shadow DOM
    this.closeButton = this.shadowRoot.querySelector(".cerrar-modal");
  }

  // Template reutilizable con slots y fallback
  get template() {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .modal {
          display: block;
          position: fixed;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -30%);
          padding: 1.5rem;
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          border-radius: 8px;
          min-width: 300px;
          max-width: 500px;
          font-family: Arial;
        }
        .cerrar-modal {
          margin-top: 1rem;
          background-color: #f44336;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>

      <div class="modal">
        <h2><slot name="titulo">Título por defecto</slot></h2>
        <p><slot name="contenido">Contenido por defecto del modal.</slot></p>
        <button class="cerrar-modal">Cerrar</button>
      </div>
    `;
    return template;
  }

  connectedCallback() {
    // Escucha el evento de cierre
    this.closeButton.addEventListener("click", () => {
      // Emite evento personalizado al cerrar
      this.dispatchEvent(new CustomEvent("modal-cerrado", {
        bubbles: true,
        composed: true,
        detail: { mensaje: "El modal fue cerrado" }
      }));
      this.remove(); // Elimina el modal del DOM
    });
  }

  disconnectedCallback() {
    // Limpieza
    this.closeButton.removeEventListener("click", () => {});
  }
}

customElements.define("espe-modal", EspeModal);
