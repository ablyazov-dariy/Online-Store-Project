import {
    PageSwitcherInterface
} from "../switcher/pageSwitcher.interface";

export interface PageInterface extends HTMLElement {
    dataPageAttribute: string | null | undefined
    HTMLTemplate: HTMLTemplateElement
    styles: "default" | "hero"
}