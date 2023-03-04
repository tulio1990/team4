import { setLocalStorage, getLocalStorage, itemsInBackpack, addClass } from "./utils.mjs";

function productDetailsTemplate(product) {
  const discount = ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100;
  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <picture>
      <source media="(max-width: 499px)" srcset="${product.ImageSmall}">
      <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" />
    </picture>
    <p class="product-card__price">$${(product.FinalPrice).toFixed(2)}</p>
    <p class="product-card__discount">${(discount).toFixed(0)}% off</p>
    <p class="product-card__RegPrice">Reg: $${(product.SuggestedRetailPrice).toFixed(2)}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
    <div class="product-detail__comments">
      <h3 id="h3Comments">Comments</h3>
      <ul class="comment-list"></ul>
      <form class="comment-form">
        <label for="comment">Add a comment:</label>
        <textarea id="comment" name="comment"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.discount = "";
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
    this.commentList = document.querySelector(".comment-list");
    this.commentForm = document.querySelector(".comment-form");
    this.loadComments();
    this.commentForm.addEventListener("submit", this.handleCommentSubmit.bind(this));
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
  addToCart() {
    let cartContents = getLocalStorage("so-cart");
    let cartIcon = document.querySelector(".cart");//find the Cart icon
    addClass(cartIcon, "sproing");//make the cart icon jiggle
    //check to see if there was anything there
    if (!cartContents) {
      cartContents = [];
    }
    // then add the current product to the list
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
    alert("Great! Your item has been added to the cart")
    itemsInBackpack();
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}