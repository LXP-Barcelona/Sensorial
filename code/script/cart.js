onload = () => {
    loadCart();
};


async function loadCart() {
    const products = await getAllProducts();
    const cart = getCartOrCreate();
    const myProduct = cart.map(c => {
        return {
            product: products.find(p => p.id === c.id),
            amount: c.amount
        }
    });
    const yourProduct = document.getElementById("yourProduct");

    yourProduct.innerHTML = `${myProduct.map(product => {

        return `<div class="productPreview">
        <div class="productImage">
            <img src="${product.product.image}" alt="product">
        </div>
        <div class="productCard">
            <div class="productInfo">
                <a>x${product.amount}</a>
                <br>
                <a>${product.product.name}</a>
                <br>
                <strong>${product.product.price.toFormat()} €</strong>
            </div>
            <div class="productCardImage">
                <img src="./img/remove.png" alt="remove icon" id="remove-${product.product.id}">
            </div>
        </div>
    </div>`


    }).join("\n")}`;
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hiddenLoader");
    }, 250)
}