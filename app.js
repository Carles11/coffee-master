import Store from "./services/Store.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

import API from "./services/API.js";

// Web Components Imports
import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

window.app = {};
app.store = Store;
app.router = Router;

// It´s better to wait for the event for manipulation
window.addEventListener("DOMContentLoaded", async () => {
  loadData();
  app.router.init();
});

window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  badge.textContent = qty;
  badge.hidden = qty == 0;
});

// define customComponents
customElements.define("cart-item", CartItem);
customElements.define("details-page", DetailsPage);
customElements.define("menu-page", MenuPage);
customElements.define("order-page", OrderPage);
customElements.define("product-item", ProductItem);
