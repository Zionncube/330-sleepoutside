import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

//eddited by happiness 
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('so-cart')) ||[];
    const count = cart.length;
    document.querySelector('.cart-count').textCount = count;
}

productList.init();
updateCartCount();

import { LoadHeaderFooter } from "./utils.mjs";
LoadHeaderFooter(); 