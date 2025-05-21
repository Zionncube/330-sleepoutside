//eddited by happiness
import { getParam } from './utils.mjs';
import { getParam } from './ProductData.mjs';
import ProductDetails, { getParam } from './ProductDetails.mjs';

const productID = getParam('product');
const dataSource = new ProductData("tents");

const product = new ProductDetails(productID, dataSource);
product.init();

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  updateCartCount(); //update cart count when adding to cart (eddited by happiness)
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}


// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  export function  renderWithTemplete(templetee, parentElement, data, callback) {
    parentElement.innerHTML = templetee;
    if (callback){
      callback(data);
    }
  }
  
  async function loadTemplete(path) {
    const res =  await fetch(path);
    const templete =  await res.text();
    return templete;
  }
  
  export async function LoadHeaderFooter() {
    const headerTemplete = await loadTemplete("../partial/header.html");
    const footerTemplete = await loadTemplete("../partial/footer.html");
    
    const headerElement = document.querySelector("main-header");
    const footerElement = document.querySelector("main-footer");
  
    renderWithTemplete(headerTemplete, headerElement);
    renderWithTemplete(footerTemplete, footerElement);
  }


