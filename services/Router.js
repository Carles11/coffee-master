const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        // const url = event.target.href
        const url2 = event.target.getAttribute("href");
        Router.go(url2);
      });
    });
    // Event Handler for URL changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.path, false);
    });

    // Check initial URL
    Router.go(location.pathname);
  },
  go: (path, addToHistory = true) => {
    // console.log(`Going to: ${path}`);

    if (addToHistory) {
      history.pushState({ path }, "", path);
    }

    let pageElement = null;

    switch (path) {
      case "/":
        pageElement = document.createElement("menu-page");
        // pageElement.textContent = "Menu";
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        // pageElement.textContent = "Your order";

        break;
      default:
        if (path.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          //   pageElement.textContent = "Details";
          const paramId = path.substring(path.lastIndexOf("-") + 1);
          pageElement.dataset.productId = paramId;
        }
    }
    if (pageElement) {
      // document.querySelector("main").children[0].remove()
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.appendChild(pageElement);

      // scroll to the top after every route change
      window.scrollX = 0;
      window.scrollY = 0;
    } else {
      // 404
      document.querySelector("main").innerHTML = "Oups! Page not found. 404";
    }
  },
};

export default Router;
