import API from "./API.js";

export async function loadData() {
  const getMenu = await API.fetchMenu();
  app.store.menu = getMenu;
}
