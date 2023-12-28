import {
    PageInterface
} from "../../pageSwitcher/pages/page.interface";
import {
    FurnitureDataInterface
} from "../data/furnitureData.interface";
import {combineLatest} from "rxjs";

export class FurniturePageClass extends HTMLElement implements PageInterface {

    dataPageAttribute: string | null
    HTMLTemplate: HTMLTemplateElement
    styles: "default" | "hero" = 'default'
    constructor(item: FurnitureDataInterface) {
        super();
        this.dataPageAttribute = item.name
        this.HTMLTemplate = document.createElement("template")
        this.HTMLTemplate.innerHTML = `<h2>${item.name}</h2>
            <p>${item.description}</p>
            <img src="${item.img}" alt="${item.description}}"><b>${item.price}</b>`
    }

    private connectedCallback() {
        this.append(this.HTMLTemplate.content.cloneNode(true));

    }
    private disconnectedCallback() {
        this.innerHTML = ''
    }
}