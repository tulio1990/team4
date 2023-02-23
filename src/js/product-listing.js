import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, itemsInBackpack, getParam } from "./utils.mjs";

loadHeaderFooter().then(() => itemsInBackpack());

import Alert from "./Alert.mjs";
Alert();

const selection = document.getElementById("select-sort");
// const selectO = new SelectOption("Name","Price", selection);
// selectO.init();
const btn = document.getElementById("btn");

btn.onclick = (event) => {
  event.preventDefault();
  // show the selected index
  if (selection.selectedIndex == 0) {
    const category = getParam("category");
    const dataSource = new ExternalServices();
    const element = document.querySelector(".product-list");
    const listing = new ProductList(category, dataSource, element, "Name");

    listing.init();
  } else {
    const category = getParam("category");
    const dataSource = new ExternalServices();
    const element = document.querySelector(".product-list");
    const listing = new ProductList(
      category,
      dataSource,
      element,
      "FinalPrice"
    );

    listing.init();
  }
};

if (selection.selectedIndex == 0) {
  const category = getParam("category");
  const dataSource = new ExternalServices();
  const element = document.querySelector(".product-list");
  const listing = new ProductList(category, dataSource, element, "Name");

  listing.init();
} else {
  const category = getParam("category");
  const dataSource = new ExternalServices();
  const element = document.querySelector(".product-list");
  const listing = new ProductList(category, dataSource, element, "FinalPrice");

  listing.init();
}
