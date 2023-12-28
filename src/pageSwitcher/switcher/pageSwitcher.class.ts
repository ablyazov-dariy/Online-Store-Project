import {
    Pages, PagesNames,
    PageSwitcherInterface
} from "./pageSwitcher.interface";
import {PageInterface} from "../pages/page.interface";
import {
    fromEvent,
    Observable,
    merge,
    filter,
    mapTo, tap, debounceTime, Subscription
} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {
    ProductsPageClass
} from "../pages/productsPage/productsPage.class";
import {
    getFurnitureData
} from "../../furniture/data/getFurnitureData";
import {
    FurniturePageClass
} from "../../furniture/render/furniturePageClass";


export class PageSwitcherClass implements PageSwitcherInterface {

    readonly pages: Pages
    private shoppingCart?: string
    private static navMenu  = document.getElementById('nav-menu') as HTMLDivElement
    private static contentContainer = document.getElementById('page-container')  as HTMLDivElement

    constructor(pages: Pages) {
        this.pages = pages
    }
    public static openPage(page: PageInterface): void {
        this.navMenu.classList.remove('hero', 'default')
        this.navMenu.classList.add(page.styles)
        this.contentContainer.innerHTML = ''
        this.contentContainer.append(page)

        // set data attr for css

        this.navMenu.setAttribute('data-page', location.pathname)
    }

    public start(): void {
        PageSwitcherClass.preventReload.bind(document)()
        this.observeHref().subscribe((page: PageInterface) => {
            PageSwitcherClass.openPage(page)
        })
    }

    private observeHref(): Observable<PageInterface> {
        const a = fromEvent(window, 'popstate').pipe(
            map((event: Event) => (event.target as Window).location.pathname.substring(1)),
            startWith(window.location.pathname.substring(1)))
        const casePage = a.pipe(
            map(href => this.pages[href.toLowerCase() || 'home'] || this.pages.notFound404))

        const caseProduct = a.pipe(
            filter(pageName => pageName.toLowerCase().startsWith('products/id=')),
            map(href => {
                const furnitureData = getFurnitureData().find(item => item.id === Number(href.slice(12)));
                return furnitureData ? new FurniturePageClass(furnitureData) : this.pages.notFound404;
            }))
        return merge(casePage, caseProduct)
    }

    public static preventReload(this: Document | ShadowRoot): Subscription {
        return fromEvent(this, 'click')
            .pipe(filter(event => event.target instanceof HTMLAnchorElement && event.target.classList.contains('page-anchor')))
            .subscribe(event => {
                event.preventDefault()
                history.pushState({}, '', (event.target as HTMLAnchorElement)
                    .getAttribute('href'))
                dispatchEvent(new Event('popstate'))
            })
    }
}

