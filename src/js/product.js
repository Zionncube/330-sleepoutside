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


