window.addEventListener("DOMContentLoaded", function () {
  customElements.define(
    "employee-review",
    class extends HTMLElement {
      constructor() {
        super();
        let template = document.getElementById("employee-review");
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
          templateContent.cloneNode(true)
        );
      }
    }
  );
});
