import { renderListWithTemplate } from "./utils.mjs";


//finction to return html teplete with right parametres
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

//line defining the constructor with 3 parametres that will be called when an instance of class is called, 
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  //initializing the product list, async means it return a proice
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  // render methord which is used to render the list
  renderList(list) {
    
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

}