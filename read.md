Componente <espe-modal> modularizado utilizando ES Modules.
Implementa <template> y Shadow DOM para encapsular estructura y estilos.
Usa slots con contenido por defecto para permitir personalización desde HTML.
Emite eventos personalizados (modal-cerrado) con dispatchEvent y detalle dinámico.
Utiliza connectedCallback() para enlazar eventos después de ser insertado en el DOM.
Todos los estilos están encapsulados y adaptados con media queries (responsive design).
Este componente no se elimina automáticamente del DOM, lo que permite múltiples interacciones.