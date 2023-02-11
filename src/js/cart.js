import {
  getLocalStorage,
  loadHeaderFooter,
  itemsInBackpack,
} from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter().then(() => itemsInBackpack());

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
