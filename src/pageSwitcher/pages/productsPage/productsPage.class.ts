import { PageInterface } from "../page.interface";
import { productsHtmlTemplate } from "./productsHtmlTemplate";

import {
    combineLatest,
    fromEvent,
    Observable,
    tap,
    merge,
    Subscription
} from "rxjs";
import { map, startWith} from "rxjs/operators";
import {
    FurnitureDataInterface
} from "../../../furniture/data/furnitureData.interface";
import {
    FurnitureRenderClass
} from "../../../furniture/render/furnitureRender.class";

export class ProductsPageClass extends HTMLElement implements PageInterface {
    dataPageAttribute: string | null | undefined;
    shadowRoot: ShadowRoot;
    HTMLTemplate: HTMLTemplateElement;
    styles: "default" = 'default'
    private readonly furnitureData: FurnitureDataInterface[]
    private subscription: Subscription | undefined

    constructor(furnitureData: FurnitureDataInterface[]) {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.HTMLTemplate = productsHtmlTemplate;
        this.furnitureData = furnitureData
    }

    private connectedCallback(): void {
        this.shadowRoot.append(this.HTMLTemplate.content.cloneNode(true));
        this.renderFurniture(this.furnitureData)
        const combinedFilterObservable = combineLatest(this.observeSearch(), this.observePriseRange(), this.observeCheckedItems())
        this.subscription = combinedFilterObservable.subscribe(([search, prise, company]) => {
            this.renderFurniture(this.filterData(prise, search, company))
        })
    }

    private disconnectedCallback(): void {
        this.subscription?.unsubscribe()
        // console.log('observable stream destroyed: ' + this.subscription?.closed)
        this.shadowRoot.innerHTML = ''
    }

    private renderFurniture = FurnitureRenderClass.renderFurnitureItem.bind(this)

    private observeSearch(): Observable<string> {
        const searchInput = this.shadowRoot.getElementById("prod-search") as HTMLInputElement;
        return fromEvent(searchInput, 'input').pipe(
            tap(() => {
                setTimeout(() => {
                    searchInput.focus()
                })
            }),
            map(() => searchInput.value),
            startWith('')
        )
    }

    private observePriseRange(): Observable<number> {
        const priseRangeInput = this.shadowRoot.getElementById('price') as HTMLInputElement
        return fromEvent(priseRangeInput, 'change').pipe(
            map(() => Number(priseRangeInput.value)),
            startWith(999),
            tap((value: number) => (this.shadowRoot.querySelector('label[for="price"]') as HTMLLabelElement).innerText = `Value: $${value}`)
        )
    }

    private observeCheckedItems(): Observable<string[]> {
        const checkboxes = this.shadowRoot.querySelectorAll(".checkbox") as NodeListOf<HTMLInputElement>
        const eventsObservable: Observable<Event>[] = Array.from(checkboxes)
            .map((checkbox: HTMLInputElement) => fromEvent(checkbox, 'change'));
        return merge(...eventsObservable).pipe(
            map(() => {
                return Array.from(checkboxes)
                    .filter((checkbox: HTMLInputElement) => checkbox.checked)
                    .map((checkbox: HTMLInputElement) => checkbox.value);
            }),
            startWith(['all'])
        );
    }

    private filterData(price: number, nameSearch: string, company: string[]): FurnitureDataInterface[] {
        return this.furnitureData.filter(
            (item: FurnitureDataInterface) =>
                item.price <= price &&
                item.name.toLowerCase().includes(nameSearch?.toLowerCase() ?? "") &&
                company.some((string: string) =>
                    string.toLowerCase().startsWith(item.company.toLowerCase()) || string === 'all'
                )
        );
    }
}
