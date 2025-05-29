document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission
    const myForm = document.forms[0]; // Get the first form in the document
    const chk_status = myForm.checkValidity(); // Check if the form is valid
    myForm.reportValidity(); // Show validation messages if any
    if (chk_status) {
      myCheckout.checkout(); // Proceed with checkout if form is valid
    }
  });
  