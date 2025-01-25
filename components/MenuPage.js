export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    }

    loadCSS();
  }

  // when the component is attached to the DOM
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const clonedContent = template.content.cloneNode(true);
    // console.log({ clonedContent });
    this.root.appendChild(clonedContent);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });
  }

  render() {
    if (app.store.menu) {
      this.root.querySelector("#menu").innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
        <h3>${category.name}</h3>
        <ul class="category"> </ul>
        `;
        this.root.querySelector("#menu").appendChild(liCategory);

        // create a new custom component for the li item
        category.products.forEach((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
