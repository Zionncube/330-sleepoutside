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

// Utility to get and set comments in localStorage
function getComments(productId) {
  const allComments = JSON.parse(localStorage.getItem('productComments')) || {};
  return allComments[productId] || [];
}

function saveComment(productId, username, commentText) {
  const allComments = JSON.parse(localStorage.getItem('productComments')) || {};
  const productComments = allComments[productId] || [];

  productComments.push({
    username,
    comment: commentText,
    date: new Date().toLocaleString()
  });

  allComments[productId] = productComments;
  localStorage.setItem('productComments', JSON.stringify(allComments));
}

function displayComments(productId) {
  const commentItems = document.getElementById('commentItems');
  commentItems.innerHTML = '';

  const comments = getComments(productId);
  comments.forEach(comment => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${comment.username}</strong> (${comment.date}): <p>${comment.comment}</p>`;
    commentItems.appendChild(li);
  });
}

// Hook into the form
document.addEventListener('DOMContentLoaded', () => {
  const productId = getProductId(); // Replace with your own function to get product ID
  displayComments(productId);

  const form = document.getElementById('comment-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (username && comment) {
      saveComment(productId, username, comment);
      displayComments(productId);
      form.reset();
    }
  });
});

// Dummy function for example
function getProductId() {
  // You can use the product ID from URL or another source
  return document.querySelector('main').dataset.productId || 'default-product';
}



