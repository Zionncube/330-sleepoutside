import { LoadHeaderFooter } from "./utils.mjs";

//loading header and footer
LoadHeaderFooter();

//getting the chekout from the element
const checkoutForm = document.querySelector("#checkout-form");

//adding event lister into the form submission

checkoutForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    //get form data
    const formData = new FormData (checkoutForm);

    //validate for data
    if (validateFormData(formData)) {
        //prcess payment
        processPayment(formData);
    } else {
        //display error massage
        displayErrorMassage("Invalid form data");
    }
});

//validate form data
function validateFormData(formData) {
    // To Do: we must implement form data validation.
    return true;
}

//processes payment
function porcessPayment(formData) {
    // To Do: we must implement payment processing.
}


//display error massage 
displayErrorMassage(massage)
 {
    //must do: implimenting error massage display
}







