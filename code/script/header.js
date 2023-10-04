window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    if (window.pageYOffset > 0) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
})

const headerElement = document.querySelector("header");
headerElement.innerHTML = `<div class="left-section">
    <a href="home.html">
        SENSORIAL
    </a>
    </div>
    <div class="right-section">
    <div class="products"><a href="products.html">${translate("header-products")}</a></div>
    <div class="cart"><a href="cart.html">${translate("header-cart")}</a></div>
    </div>`