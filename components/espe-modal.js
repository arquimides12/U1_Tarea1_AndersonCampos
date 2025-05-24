class EspeModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

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
          padding: 2rem;
          background: white;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
          border: 1px solid #ddd;
          border-radius: 48px;
          min-width: 300px;
          max-width: 500px;
          width: 80%;
          font-family: Arial, sans-serif;
          text-align: center;
          transition: all 0.3s ease-in-out;
        }

        button {
          margin: 0.5rem;
          padding: 0.7rem 1.5rem;
          border: none;
          color: white;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }

        .btn-verde {
          background-color: green;
        }

        .btn-azul {
          background-color: blue;
        }

        .btn-rojo {
          background-color: red;
        }

        @media (max-width: 600px) {
          .modal {
            width: 90%;
            top: 20%;
            transform: translate(-50%, -20%);
            padding: 1rem;
          }

          button {
            width: 100%;
          }
        }
      </style>

      <div class="modal">
        <h2><slot name="titulo">Resultado del estudiante</slot></h2>
        <p><slot name="contenido">Seleccione una calificación:</slot></p>
        <button class="btn-verde" id="btn20">20 puntos</button>
        <button class="btn-azul" id="btn18">18 puntos</button>
        <button class="btn-rojo" id="btn14">14 puntos</button>
      </div>
    `;
    return template;
  }

  connectedCallback() {
    this.shadowRoot.getElementById("btn20").addEventListener("click", () => {
      this.enviarNota("Usted sacó nota máxima (20)");
    });

    this.shadowRoot.getElementById("btn18").addEventListener("click", () => {
      this.enviarNota("Usted sacó 18 puntos");
    });

    this.shadowRoot.getElementById("btn14").addEventListener("click", () => {
      this.enviarNota("Usted sacó nota mínima (14)");
    });
  }

  enviarNota(mensaje) {
    this.dispatchEvent(new CustomEvent("modal-cerrado", {
      bubbles: true,
      composed: true,
      detail: { mensaje }
    }));
    // this.remove(); // Se mantiene visible
  }

  disconnectedCallback() {
    ["btn20", "btn18", "btn14"].forEach(id => {
      const btn = this.shadowRoot.getElementById(id);
      btn?.removeEventListener("click", this.enviarNota);
    });
  }
}

customElements.define("espe-modal", EspeModal);
