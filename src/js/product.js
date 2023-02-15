import { getParam, loadHeaderFooter, itemsInBackpack } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter().then(() => itemsInBackpack());

const dataSource = new ExternalServices();
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
