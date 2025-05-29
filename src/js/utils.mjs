// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//eddited by happiness
export function getParam(param) {
  const  queryString = window.location.search;
  const urlParams = new urlSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

// Displays an alert message at the top of the main element
export function alertMessage(message, scroll = true) {
  const main = document.querySelector('main'); // Get the main element
  const alert = document.createElement('div'); // Create a new div for the alert
  alert.classList.add('alert'); // Add a class for styling
  alert.innerHTML = `<p>${message}</p>`; // Set the alert message
  main.prepend(alert); // Insert the alert at the top of the main element
  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top if needed
  }
}
