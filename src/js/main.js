import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const selection = document.getElementById("select-sort");
// const selectO = new SelectOption("Name","Price", selection);
// selectO.init();
const btn = document.getElementById("btn");

btn.onclick = (event) => {
    event.preventDefault();
    // show the selected index
    if(selection.selectedIndex == 0){
        const dataSource = new ProductData("tents");
        const element = document.querySelector(".product-list");
        const listing = new ProductList("tents", dataSource, element, "Name");

        listing.init();
    }else{
        const dataSource = new ProductData("tents");
        const element = document.querySelector(".product-list");
        const listing = new ProductList("tents", dataSource, element, "FinalPrice");

        listing.init();
    };
};

if(selection.selectedIndex == 0){
    const dataSource = new ProductData("tents");
    const element = document.querySelector(".product-list");
    const listing = new ProductList("tents", dataSource, element, "Name");

    listing.init();
}else{
    const dataSource = new ProductData("tents");
    const element = document.querySelector(".product-list");
    const listing = new ProductList("tents", dataSource, element, "FinalPrice");

    listing.init();
};



loadHeaderFooter();

