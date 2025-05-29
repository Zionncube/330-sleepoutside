async checkout() {
  try {
    const response = await this.myServices.checkout(this.cartData);
    // Success path
    this.cart.clearCart();
    window.location.href = 'success.html';
  } catch (err) {
    console.error('Checkout failed:', err);
    if (err.name === 'servicesError') {
      alertMessage(`Checkout failed: ${err.message.message}`, true);
    } else {
      alertMessage('An unexpected error occurred. Please try again.', true);
    }
  }
}

  

  