onload = () => {
    loadLang();
    loadCart();
};


async function loadCart() {
    const cart = getCartOrCreate();
    let myProduct = [];
    if (cart.length > 0) {
        const products = await findProduct(cart.map(c => c.id).join(","));
        myProduct = cart.map(c => ({
            amount: c.amount,
            product: products.find(p => p.id === c.id)
        }));
    }
    const yourProduct = document.getElementById("yourProduct");
    const totalPrice = myProduct.reduce((total, item) => total + (item.product.price * item.amount), 0);
    const amountTotal = document.getElementById('amountTotal');
    amountTotal.innerHTML = `${totalPrice.toFormat()} €`;

    yourProduct.innerHTML = myProduct.length > 0 ? `${myProduct.map(product => (
    `<div class="productPreview">
        <div class="AmountBandContainer">
            <div class="AmountBand">
                x${product.amount}
            </div>
        </div>
        <div class="productImage" onclick="document.location.href = 'product.html?id=${product.product.id}'">
            <img src="${product.product.image}" alt="product">
        </div>
        <div class="productCard">
            <div class="productInfo">
                <p>${product.product.name}</p>
                <strong>${(product.amount*product.product.price).toFormat()} €</strong>
            </div>
            <div class="productCardImage">
                <img src="./img/update.png" alt="update-cart" id="update-${product.product.id}">
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
    if (event.target.id.startsWith("update-")) {
        const id = parseInt(event.target.id.replace(/update-/, ''));
        changeAmountProduct(id).then(() => loadCart())
    }
}