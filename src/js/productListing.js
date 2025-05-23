import ProductData from './ProductData.js';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Load header and footer components
loadHeaderFooter();

// Get the category from the URL parameters
const category = getParam('category');

// Create a new ProductData instance to handle API calls
const dataSource = new ProductData();

// Get the container element where products will be rendered
const listElement = document.querySelector('.product-list');

// Create a new ProductList to render products
const myList = new ProductList(category, dataSource, listElement);

// Initialize the product list based on the category
myList.init();

// SEARCH FEATURE STARTS HERE

// Get the input and button elements for the search
const searchInput = document.getElementById('productSearch');
const searchButton = document.getElementById('searchBtn');

// Add a click listener to the search button
searchButton.addEventListener('click', async () => {
  const term = searchInput.value.trim(); // Get and clean the search term
  if (term.length === 0) return; // Do nothing if empty

  try {
    // Get search results from the API
    const results = await dataSource.searchProducts(term);

    // If results found, render them. Otherwise, show a message.
    if (results.length > 0) {
      myList.renderList(results); // Render search results
    } else {
      listElement.innerHTML = `<p>No products found for "${term}".</p>`;
    }
  } catch (error) {
    console.error('Search failed:', error);
    listElement.innerHTML = `<p>Error searching for "${term}".</p>`;
  }
});
