import {
    PageInterface
} from "../../pageSwitcher/pages/page.interface";
import {
    FurnitureDataInterface
} from "../data/furnitureData.interface";
import {FurniturePageClass} from "./furniturePageClass";
import {
    PageSwitcherClass
} from "../../pageSwitcher/switcher/pageSwitcher.class";
import {
    ShoppingCartClass
} from "../../shoppingCart/shoppingCart.class";

export class FurnitureRenderClass {


    public static renderFurnitureItem(this: PageInterface, data: FurnitureDataInterface[]): void {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        data.forEach((item: FurnitureDataInterface) => {
            const itemContainer: HTMLDivElement = document.createElement('div');
            itemContainer.classList.add('furniture-item');

            const btnContainer: HTMLDivElement = document.createElement('div');
            btnContainer.classList.add('btn-container');

            const viewDetailsAnchor: HTMLAnchorElement = document.createElement('a');
            viewDetailsAnchor.href = '/products/id=' + item.id
            viewDetailsAnchor.classList.add('page-anchor')
            viewDetailsAnchor.innerText = 'View Product Details';

            const addToCartBtn: HTMLButtonElement = document.createElement('button');
            addToCartBtn.innerText = 'Add to Cart';
            addToCartBtn.onclick = () => {
                ShoppingCartClass.storage.setItemOrIncrementCount(item)
            }

            btnContainer.appendChild(viewDetailsAnchor);
            btnContainer.appendChild(addToCartBtn);

            const imgContainer = document.createElement('div')
            imgContainer.classList.add('img-container')
            imgContainer.innerHTML = `<img src="${item.img}" alt="${item.description}">`


            const name: HTMLSpanElement = document.createElement('span');
            name.innerText = item.name;

            const price: HTMLSpanElement = document.createElement('span');
            price.classList.add('price');
            const b: HTMLElement = document.createElement('b');
            b.innerText = String(item.price);
            price.appendChild(b);

            itemContainer.appendChild(btnContainer);
            itemContainer.appendChild(imgContainer);
            itemContainer.appendChild(name);
            itemContainer.appendChild(price);

            this.appendChild(itemContainer);
        });
    }

}