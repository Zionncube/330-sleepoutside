async checkout() {
    try {
      // Attempt to process the checkout
      const order = await this.services.checkout(this.form);
      // On success, clear the cart and redirect to success page
      localStorage.removeItem('so-cart');
      window.location.href = 'success.html';
    } catch (err) {
      // If an error occurs, display an alert message
      alertMessage(err.message.message);
    }
  }
  
  