class MiComponente extends HTMLElement {
    constructor() {
        super();
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
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    background: #f0f0f0;
                }
                h2 {
                    color: #333;
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
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
}

customElements.define('mi-componente', MiComponente);
