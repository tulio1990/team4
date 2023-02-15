import { loadHeaderFooter, itemsInBackpack } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter().then(() => itemsInBackpack());

const checkout = new CheckoutProcess("so-cart", ".checkoutSummary")
checkout.init();

document.querySelector("#zipCode").addEventListener("blur", checkout.calculateOrdertotal.bind(checkout));