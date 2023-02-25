import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }
  async init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }
  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item);
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);

    if (cartItems == null) {
        console.log("Cart is empty");
      } else {
        //const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

        this.renderCartTotal();
      }
  }

  renderCartTotal() {
    let itemPrice = 0;
    const cartItems = getLocalStorage(this.key);
    const priceOfItems = cartItems.map((item) => itemPrice = item.FinalPrice);
    console.log(cartItems);
    console.log(priceOfItems[1]);
    console.log(priceOfItems[2]);
        
    let total = priceOfItems.reduce((acumulador, currentValue) => acumulador + currentValue, 0).toFixed(2);
    //console.log(total);

    let unhideTotal = document.querySelector(".cart-total-hide");
    unhideTotal.style.display = "block";
    let displayTotal = document.querySelector(".cart-total");
    displayTotal.innerHTML = `Total: $${total}`;
  }
}
