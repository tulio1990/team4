import { loadHeaderFooter, itemsInBackpack } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter().then(() => itemsInBackpack());

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();
if (cart.total > 0) {
  // show our checkout button and total if there are items in the cart.
  document.querySelector(".list-footer").classList.remove("hide");
}
cart.renderCartContents();
