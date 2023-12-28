// @ts-ignore
import style from './homeStyles.css?inline'

export const homeHtmlTemplate: HTMLTemplateElement = document.createElement('template')
homeHtmlTemplate.innerHTML = `<h2>Featured</h2>
    <div class="content"><slot></slot></div>
    <a class="page-anchor" href="/products">ALL PRODUCTS</a>
    <style>${style}</style>`