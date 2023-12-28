import { homeHtmlTemplate } from "./homeHtmlTemplate";
import { PageInterface } from "../page.interface";
import {
    FurnitureDataInterface
} from "../../../furniture/data/furnitureData.interface";
import {
    PageSwitcherClass
} from "../../switcher/pageSwitcher.class";
import {
    ProductsPageClass
} from "../productsPage/productsPage.class";
import {
    FurnitureRenderClass
} from "../../../furniture/render/furnitureRender.class";
import {fromEvent, Observable, Subscription} from "rxjs";
import {
    getFurnitureData
} from "../../../furniture/data/getFurnitureData";

export class HomePageClass extends HTMLElement implements PageInterface {
    dataPageAttribute: string | null | undefined;
    shadowRoot: ShadowRoot;
    HTMLTemplate: HTMLTemplateElement;
    styles: "default" | "hero" = 'hero'
    subscription?:  Subscription
    constructor(private readonly furnitureData: FurnitureDataInterface[]) {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.HTMLTemplate = homeHtmlTemplate
    }

    private connectedCallback(): void {
        this.subscription = PageSwitcherClass.preventReload.bind(this.shadowRoot)()
        this.shadowRoot.append(this.HTMLTemplate.content.cloneNode(true));
        this.renderFurniture(this.getThreeRandomElms())
    }

    private disconnectedCallback() {
        this.subscription?.unsubscribe()
        this.shadowRoot.innerHTML = ''
    }

    private getThreeRandomElms(): [FurnitureDataInterface, FurnitureDataInterface, FurnitureDataInterface] {

        const selectedIndices = new Set<number>();
        while (selectedIndices.size < 3) {
            selectedIndices.add(this.getRandomIntLessThan(this.furnitureData.length));
        }
        const selectedElements = Array.from(selectedIndices).map(index => this.furnitureData[index]);
        return [selectedElements[0], selectedElements[1], selectedElements[2]];
    }

    private getRandomIntLessThan(maxInt: number): number {
        return Math.floor(Math.random() * (maxInt));
    }

    private renderFurniture = FurnitureRenderClass.renderFurnitureItem.bind(this)
}



