import {PageInterface} from "../page.interface";

export class NotFoundErrorPage404Class extends HTMLElement implements PageInterface {
    dataPageAttribute: string | null | undefined
    shadowRoot: ShadowRoot;
    HTMLTemplate: HTMLTemplateElement;
    styles: "default" | "hero" = 'default'
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.HTMLTemplate = document.createElement('template')
        this.HTMLTemplate.innerHTML = `<span>Error 404: page not found</span>`
    }

    private connectedCallback(): void {
        this.shadowRoot.append(this.HTMLTemplate.content.cloneNode(true))
    }

    private disconnectedCallback() {
        this.shadowRoot.innerHTML = ''
        this.innerHTML = ''
    }
}