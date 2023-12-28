import './scss/style.scss'
import {
    getFurnitureData
} from "./furniture/data/getFurnitureData";
import {
    ProductsPageClass
} from "./pageSwitcher/pages/productsPage/productsPage.class";
import {
    PageSwitcherClass
} from "./pageSwitcher/switcher/pageSwitcher.class";
import {
    AboutPageClass
} from "./pageSwitcher/pages/aboutPage/aboutPage.class";
import {
    HomePageClass
} from "./pageSwitcher/pages/homePage/homePage.class";
import {
    Pages
} from "./pageSwitcher/switcher/pageSwitcher.interface";
import {
    FurniturePageClass
} from "./furniture/render/furniturePageClass";
import {
    CheckOutPageClass
} from "./pageSwitcher/pages/checkout/checkoutPage.class";
import {
    ShoppingCartClass
} from "./shoppingCart/shoppingCart.class";
import {
    NotFoundErrorPage404Class
} from "./pageSwitcher/pages/notFoundErrorPage404/notFoundErrorPage404.class";
customElements.define('page-404', NotFoundErrorPage404Class)
customElements.define('products-page', ProductsPageClass)
customElements.define('about-page', AboutPageClass)
customElements.define('home-page', HomePageClass)
customElements.define('fitem-page', FurniturePageClass)
customElements.define('checkout-page', CheckOutPageClass)

const data = getFurnitureData()
const pages: Pages = {
    home: new HomePageClass(data),
    products: new ProductsPageClass(data),
    about: new AboutPageClass(),
    checkout: new CheckOutPageClass(ShoppingCartClass.storage),
    notFound404: new NotFoundErrorPage404Class()
}

const pageSwitcher = new PageSwitcherClass(pages)
const shoppingCart = new ShoppingCartClass()
pageSwitcher.start()
shoppingCart.start()
