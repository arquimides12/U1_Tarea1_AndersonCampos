class MiComponente extends HTMLElement {
    constructor() {
        super();
        // Crear una raíz de sombra para el componente
        // Esto encapsula los estilos y el marcado del componente
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['tema'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'tema') {
            this.shadowRoot.querySelector('.card').style.background = newValue;
        }
    }

    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="card">
                <h2><slot name="titulo"></slot></h2>
                <div><slot name="contenido"></slot></div>
                <div>
                <slot> </slot>
                </div> 
            </section>
            ${this.getStyles()}
        `;
        return template;
    }
    

    getStyles() {
        return `
            <style>
                .card {
                    padding: 1rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px red;
                    background: #f0f0f0;
                }
                h2 {
                    color: red;
                    font-size: 2rem;
                    text-align: center;
                    font-size: 1.5rem;
                }
                div {
                    color: #555;
                    font-size: 1rem;
                }
            </style>
        `;
    }

    connectedCallback() {
        // Cuando el componente se añade al DOM, se clona el template
        // y se añade al shadow DOM
        // Esto permite que el componente tenga su propio DOM
        // y sus propios estilos
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
}
// Definir el nuevo elemento personalizado
// Esto permite que el componente se pueda usar como un elemento HTML
customElements.define('mi-componente', MiComponente);
