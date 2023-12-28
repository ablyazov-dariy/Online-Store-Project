import { PageInterface } from "../page.interface";

export class AboutPageClass extends HTMLElement implements PageInterface {
    dataPageAttribute: string | null | undefined
    shadowRoot: ShadowRoot;
    HTMLTemplate: HTMLTemplateElement;
    styles: "default" | "hero" = 'default'
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.HTMLTemplate = document.createElement('template')
        this.HTMLTemplate.innerHTML = `<slot></slot>`
    }

    private connectedCallback(): void {
        this.shadowRoot.append(this.HTMLTemplate.content.cloneNode(true))
        const historyDiv = document.createElement("div");
        historyDiv.innerHTML = `
        <h2>Our History</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam assumenda atque consectetur cumque distinctio eligendi impedit inventore ipsum maiores, minus nesciunt obcaecati officia omnis, repellat temporibus totam ut voluptatum.</p>
    `;
        this.append(historyDiv)
    }



    private disconnectedCallback() {
        this.shadowRoot.innerHTML = ''
        this.innerHTML = ''
    }
}