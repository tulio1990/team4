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
    <picture>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${(product.FinalPrice).toFixed(2)}</p>
    <p class="product-card__discount">${(discount).toFixed(0)}% off</p>
    <p class="product-card__RegPrice">Reg: $${(product.SuggestedRetailPrice).toFixed(2)}</p></a>
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
  }

  // render before doing the stretch
//   renderList(list) {
//     const htmlStrings = list.map(productCardTemplate);
//     this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
//   }
}