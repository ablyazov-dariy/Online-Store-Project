// @ts-ignore
import style from './prodPageStyle.css?inline'
export const productsHtmlTemplate = document.createElement("template");
productsHtmlTemplate.innerHTML = `<form class="sticky">
        <input type="search" id="prod-search">
        <h3 class="filter-heading">Company</h3>
        <ul>
        <li>
          <input type="checkbox" name="company" class="checkbox" id="all" value="all" checked>
          <label for="all">All</label>
        </li>
        <li>
          <input type="checkbox" name="company" class="checkbox" id="ikea" value="Ikea">
          <label for="ikea">IKEA</label>
        </li>
        <li>
          <input type="checkbox" name="company" class="checkbox" id="marcos" value="Marcos">
          <label for="marcos">Marcos</label>
        </li>
        <li>
          <input type="checkbox" name="company" class="checkbox" id="caressa" value="Caressa">
          <label for="caressa">Caressa</label>
        </li>
        <li>
          <input type="checkbox" name="company" class="checkbox" id="liddy" value="Liddy">
          <label for="liddy">Liddy</label>
        </li>
      </ul>
        <h3 class="filter-heading">Price</h3>
        <input type="range" name="price" id="price" min="10", max="999" value="999">
        <br>
        <label for="price"></label>
     </form>
     <div class="content"><slot></slot></div>
     <style>${style}</style>`;
