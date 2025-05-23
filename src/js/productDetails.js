import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

const id = getParam('id');
const dataSource = new ProductData();

async function init () {
    const product = await dataSource.findProductById(id);
    //render product detsils
}

init();