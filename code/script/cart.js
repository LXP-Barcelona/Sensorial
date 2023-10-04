onload = () => {
    loadLang();
    loadCart();
};


async function loadCart() {
    const products = await getAllProducts();
    const cart = getCartOrCreate();
    const myProduct = cart.map(c => ({
        product: products.find(p => p.id === c.id),
        amount: c.amount
    }));
    const yourProduct = document.getElementById("yourProduct");
    const totalPrice = myProduct.reduce((total, item) => total + (item.product.price * item.amount), 0);
    const amountTotal = document.getElementById('amountTotal');
    amountTotal.innerHTML = `${totalPrice.toFormat()} €`;

    yourProduct.innerHTML = myProduct.length > 0 ? `${myProduct.map(product => (
    `<div class="productPreview">
        <div class="productImage" onclick="document.location.href = 'product.html?id=${product.product.id}'">
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
    )).join("\n")}` : translate("cart-empty");
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hiddenLoader");
    }, 250)
}

onclick = async (event) => {
    if (event.target.id.startsWith("remove-")) {
        const id = parseInt(event.target.id.replace(/remove-/, ''));
        removeProduct(id).then(() => loadCart())
    }
}