import {
    FurnitureDataInterface
} from "../furniture/data/furnitureData.interface";
import {
    LocalStorageInterface
} from "../localStorage/localStorage.interface";
import {
    LocalStorageClass
} from "../localStorage/localStorage.class";
import {fromEvent, tap} from "rxjs";
import {map} from "rxjs/operators";
import {
    PageSwitcherClass
} from "../pageSwitcher/switcher/pageSwitcher.class";
import {
    CheckOutPageClass
} from "../pageSwitcher/pages/checkout/checkoutPage.class";
import {
    PageInterface
} from "../pageSwitcher/pages/page.interface";


export class ShoppingCartClass {
    public static storage: LocalStorageInterface<FurnitureDataInterface> = new LocalStorageClass('cart-items')
    private shoppingCartContainer: HTMLElement = document.getElementById('shopping-cart') as HTMLElement
    private openButton: HTMLButtonElement = document.getElementById('s-cart-open-btn') as HTMLButtonElement
    private closeButton: HTMLButtonElement = document.getElementById('s-cart-close-btn') as HTMLButtonElement
    private itemsContainer: HTMLDivElement = document.getElementById('items-container') as HTMLDivElement
    private totalPriceSpan: HTMLSpanElement = document.getElementById('total-price') as HTMLSpanElement

    private openClose(): void {
        fromEvent(this.openButton, 'click')
            .subscribe(() => {
                this.shoppingCartContainer.style.display = 'flex'
                document.onscroll = () => {
                    this.shoppingCartContainer.style.display = 'none'
                    // Remove the event listener
                    document.onscroll = null
                }
            })
        fromEvent(this.closeButton, 'click')
            .subscribe(() => {
                this.shoppingCartContainer.style.display = 'none'
                // Remove the event listener
                document.onscroll = null
            })
    }

    public start() {
        this.openClose()
        ShoppingCartClass.storage.getDataObservable().subscribe((value: { count: number; itemData: FurnitureDataInterface; }[]) => {
            this.itemsContainer.innerHTML = ''
            let count: number = 0
            value.forEach(el => {
                count += Math.round(el.itemData.price * el.count)
                const elContainer = document.createElement("div")
                elContainer.classList.add('el-container')
                elContainer.innerHTML = `<img src="${el.itemData.img}">
                    <div class="sub-el-cont">
                        <h3>${el.itemData.name}</h3>
                        <b>${el.itemData.price}</b>
                    </div>
                    <span class="count">${el.count}</span>`;
                const removeBtn = document.createElement("button")
                removeBtn.innerText = 'remove'
                elContainer.querySelector('.sub-el-cont')!.appendChild(removeBtn)
                this.itemsContainer.appendChild(elContainer)
                removeBtn.onclick = (_=> ShoppingCartClass.storage.removeItemOrDecrementCount(el.itemData.id))
            })
            this.totalPriceSpan.innerText = String(count)
        })
    }
}