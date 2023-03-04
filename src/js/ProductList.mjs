import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const discount = ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100;
  if (product.Id != "989CG" && product.Id != "880RT"){
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <picture>
    <source media="(max-width: 499px)" srcset="${product.ImageSmall}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <picture></a>
    <section class="product-card-buttons">
      <button><img class="card-buttons lookup-buttons" id="${product.Id}" src="../images/icon_watch.svg" alt="icon for lookup"></button>
      <button><img class="card-buttons comment-buttons" src="../images/icon_comment.svg" alt="icon for comment"></button>
      <button><img class="card-buttons wish-buttons" id="${product.Id}" src="../images/icon_wish.svg" alt="icon for wish"></button>
    </section>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${(product.FinalPrice).toFixed(2)}</p>
    <p class="product-card__discount">${(discount).toFixed(0)}% off</p>
    <p class="product-card__RegPrice">Reg: $${(product.SuggestedRetailPrice).toFixed(2)}</p>
  </li>`;
  }

}

export default class ProductList {
  constructor(category, dataSource, listElement, valueSort) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.valueSort = valueSort;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    const valueSortSelected = this.valueSort;
    if (valueSortSelected == "Name"){
      // console.log("Name");
      this.listElement.innerHTML = "";
      list.sort((a, b) => (a.Name > b.Name? 1 : -1));
    }else{
      // console.log("Precio");
      this.listElement.innerHTML = "";
      list.sort((a, b) => (a.FinalPrice > b.FinalPrice? 1 : -1));
    }
    
    // render the list
    // console.log(list);
    this.renderList(list);
    //set the title to the current category
    document.querySelector(".title").innerHTML = this.category;
  }
  // render after doing the first stretch
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
    this.gettingIDs();
    this.addingWish();
  }

  gettingIDs(){
    const lookupButtons = document.querySelectorAll(".lookup-buttons");
    lookupButtons.forEach((lookupButton) => {
      lookupButton.addEventListener("click", (event) => {
        const ModalId = event.target.id;
        this.displayingModal(ModalId).then(() => this.closingModal());
      })
    })
  }

  async displayingModal(ModalId){
    const productModal = await this.dataSource.findProductById(ModalId);
    const modalBody = this.modalTemplate(productModal);
    const parentElement = document.querySelector(".divider");
    parentElement.insertAdjacentHTML('beforeend', modalBody);
  };

  closingModal() {
    const closeBtn = document.querySelector('.closeButton');
    const modalContainer = document.querySelector("#modalContainer");
    closeBtn.addEventListener('click', () => {
      modalContainer.remove();
    });

    window.addEventListener('click', (event) => {
      const modalOutside = document.querySelector(".modal");
      if (event.target == modalOutside) {
        modalContainer.remove();
      }
    });
  }
  modalTemplate(productModal){
    const discount = ((productModal.SuggestedRetailPrice - productModal.FinalPrice) / productModal.SuggestedRetailPrice) * 100;
    const modalBodyTemplate = `
      <div id="modalContainer" class="modal">
        <div class="modalContent">
          <span class="closeButton">X</span>
          <a href="../product_pages/index.html?product=${productModal.Id}">
            <picture>
              <source media="(max-width: 499px)" srcset="${productModal.ImageSmall}">
              <img src="${productModal.Images.PrimaryMedium}" alt="Image of ${productModal.Name}"/>
            <picture></a>
          <h3 class="card__brand">${productModal.Brand.Name}</h3>
          <h2 class="card__name">${productModal.Name}</h2>
          <p class="product-card__price">$${(productModal.FinalPrice).toFixed(2)}</p>
          <p class="product-card__discount">"$${(discount).toFixed(0)}"% off</p>
          <p class="product-card__RegPrice">Reg: $${(productModal.SuggestedRetailPrice).toFixed(2)}</p>            <p class="product__description">${productModal.DescriptionHtmlSimple}</p>
        </div>
      </div>`
    return modalBodyTemplate;
  }
  
  addingWish() {
    const wishButtons = document.querySelectorAll(".wish-buttons");
    wishButtons.forEach((wishButton) => {
      const wishId = wishButton.id;
      if (localStorage.getItem(wishId)) {
        wishButton.classList.add("wishOn");
      }
      wishButton.addEventListener("click", ()=> {
        if (wishButton.classList.contains("wishOn")) {
          wishButton.classList.remove("wishOn");
          localStorage.removeItem(wishId);
        } else {
          wishButton.classList.add("wishOn");
          localStorage.setItem(wishId, "true");
        }
      })
    })
  }
}
