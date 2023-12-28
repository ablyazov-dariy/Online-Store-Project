import {
    PageInterface
} from "../page.interface";
import {checkoutHtmlTemplate} from "./checkoutHtmlTemplate";
import {
    LocalStorageInterface
} from "../../../localStorage/localStorage.interface";
import {
    FurnitureDataInterface
} from "../../../furniture/data/furnitureData.interface";

export class CheckOutPageClass extends HTMLElement implements PageInterface {
    HTMLTemplate: HTMLTemplateElement;
    dataPageAttribute: string | null | undefined;
    styles: "default" | "hero" = "default"
    shadowRoot: ShadowRoot
    constructor(private storage: LocalStorageInterface<FurnitureDataInterface>) {
        super();
        this.HTMLTemplate = checkoutHtmlTemplate
        this.shadowRoot = this.attachShadow({mode: "open"})

    }
    private connectedCallback() {
        this.shadowRoot.append(this.HTMLTemplate.content.cloneNode(true));
        this.storage.getDataObservable().subscribe((value: {count: number, itemData: FurnitureDataInterface}[] )=> {
            let count: number = 0
            value.forEach(el => {
                count += Math.round(el.itemData.price * el.count)
            })
            this.shadowRoot.querySelectorAll('.price-to-pay')!
                .forEach(el => el.innerHTML = String(count))
        })
    }

    disconnectedCallback() {
        this.shadowRoot.innerHTML = ''
    }

}