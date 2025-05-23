// Helper function to convert API response to JSON or throw error
function convertToJson(response) {
  if (response.ok) {
    return response.json(); // Convert successful response to JSON
  } else {
    throw new Error("API request failed"); // Throw error if not successful
  }
}

// Get base URL from environment variable
const baseURL = import.meta.env.VITE_SERVER_URL;

// Export the ProductData class
export default class ProductData {
  constructor(category = null) {
    this.category = category; // Store optional category name
  }

  // Fetch product list by category from API
  async getData(category = this.category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result; // Return product list array
  }

  // Search products by keyword
  async searchProducts(term) {
    const response = await fetch(`${baseURL}products/search?query=${term}`);
    const data = await convertToJson(response);
    return data.Result; // Return matching products
  }

  // Find a single product by its ID
  async findProductById(id) {
    const response = await fetch(`${baseURL}products/${id}`);
    const data = await convertToJson(response);
    return data.Result; // Return product object
  }
}
