import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];

  // code to ensure that  cartItems is an array
  if (!Array.isArray(cartItems)) {
    console.warn(
      "cartItems was a single object, converting to array:",
      cartItems,
    );
    cartItems = [cartItems]; // if not wrap it in an array (by pass)
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

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
