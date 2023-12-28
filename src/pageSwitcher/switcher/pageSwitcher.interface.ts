import {PageInterface} from "../pages/page.interface";

export interface PageSwitcherInterface {
    start(): void
}

export type Pages = {
    [key: string]: PageInterface
    home: PageInterface
    products: PageInterface
    about: PageInterface
    checkout: PageInterface
    notFound404: PageInterface
}

export type PagesNames = 'home' | 'products' | 'about'