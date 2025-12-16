class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._initialized = false;
        //this.loadTemplate();
    }

    async loadTemplate() {
        try {
            const response = await fetch("/pages/navbar.html");
            if (!response.ok) { throw new Error(`HTTP ${response.status} bij ophalen navbar.html`); }
            const html = await response.text();

            const template = document.createElement("template");
            template.innerHTML = html;

            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.initialize(); // Na het inladen van de HTML, event listeners koppelen

        } catch (error) {
            console.error("Kon navbar.html niet laden:", error);
        }
    }

    connectedCallback() {
        // fallback: als de template al geladen was vóór connectedCallback
        //if (this.shadowRoot.children.length && !this._initialized) {
        if (!this._initialized) {
            this.loadTemplate();
        }
    }

    initialize() {
        if (this._initialized) return;
        this._initialized = true;
        this.sidebar = this.shadowRoot.getElementById("sidebar");
        this.toggleButton = this.shadowRoot.getElementById("toggle-btn");
        const us = this.shadowRoot.getElementById("us");
        const glasses = this.shadowRoot.getElementById("glasses");

        if (!this.sidebar || !this.toggleButton) {
            console.warn("Navbar: elementen niet gevonden in shadowRoot");
            return;
        }

        if (this.toggleButton) this.toggleButton.addEventListener("click", () => this.toggleSidebar());
        if (us) us.addEventListener("click", () => this.toggleSubMenu(us));
        if (glasses) glasses.addEventListener("click", () => this.toggleSubMenu(glasses));

        this.shadowRoot.addEventListener("click", e => {  // SPA-navigatie: links in de shadow DOM koppelen aan de router in index.js
            const link = e.composedPath().find(
                el =>
                    el instanceof HTMLElement &&
                    el.matches &&
                    el.matches("[data-link]")
            );
            if (!link) return;

            e.preventDefault(); // Laat index.js het verder afhandelen
            window.dispatchEvent(new CustomEvent("spa-navigation", { detail: link.href }));
        });
    }

    disconnectedCallback() {
        // hier kun je eventueel event listeners weer verwijderen als je dat netjes wilt maken
    }

    closeAllSubMenus() {
        if (!this.sidebar) return;

        Array.from(this.sidebar.getElementsByClassName("show")).forEach((ul) => {
            ul.classList.remove("show");
            if (ul.previousElementSibling) {
                ul.previousElementSibling.classList.remove("rotate");
            }
        });
    }

    toggleSidebar() {
        if (!this.sidebar || !this.toggleButton) return;
        this.sidebar.classList.toggle("close");
        this.toggleButton.classList.toggle("rotate");
        this.closeAllSubMenus();
    }

    toggleSubMenu(button) {
        const submenu = button.nextElementSibling;
        if (!submenu) return;
        if (!submenu.classList.contains("show")) {
            this.closeAllSubMenus();
        }

        submenu.classList.toggle("show");
        button.classList.toggle("rotate");

        if (this.sidebar.classList.contains("close")) {
            this.sidebar.classList.toggle("close");
            this.toggleButton.classList.toggle("rotate");
        }
    }
}

window.customElements.define("nav-bar", NavBar);
