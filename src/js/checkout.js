import { loadHeaderFooter, itemsInBackpack } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter().then(() => itemsInBackpack());

const myCheckout = new CheckoutProcess("so-cart", ".checkoutSummary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  myCheckout.checkout();
});
