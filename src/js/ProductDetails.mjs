//eddited by happiness
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

//new page for  produt details
export default class ProductDetails
{
    constructor(productID, dataSource)
    {
        this.productID = productID;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // fetch product details and render HTML

        this.addProductToCart.product= await this.dataSource.findProductById(this.productID);
        this.renderProductDetails();

        document
         .getElementById('addToCart')
         .addEventListener('click', this.addProductToCart.bind(this));
    }


    addProductToCart() {
        //add product to cart logic
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        //generate html product details
        ProductDetailsTemplete(this.product);
        
        function productDetailsTemplete(product) {
            document.querySelector('h2').textContent = Brand.Name;
            document.querySelector('h3').textContent = NameWithoutBrand;
        }
        const productImage =document.getElementById(productImage);
        productImage.src = this.product.Image;
        productImage.alt = this.product.NameWithoutBrand

        document.getElementById('productPrice').textContent = product.finalPrice;
        document.getElementById('productCoor').textContent = product.coloe[0].colorName;
        document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

        document.getElementById('addToCart').dataset.is = product.id;
    }

    
}