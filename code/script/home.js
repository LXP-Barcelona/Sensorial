window.onload = () => {
    loadLang();
    loadPreview();
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hiddenLoader");
    }, 250)
}

async function loadPreview() {
    const cart = getCartOrCreate();
    const productsPreviewContainer = document.getElementById("productsPreviewContainer");
    productsPreviewContainer.innerHTML = (await findProduct("1,2,3,4,5,6")).map(product => {
        const elementInCart = cart.find(c => c.id === product.id);
        return `<div class="productPreview">
                    <div class="AmountBandContainer">
                        <div class="AmountBand">
                            x${elementInCart?.amount || 0}
                        </div>
                    </div>
                    <div class="productImage"  onclick="document.location.href = 'product.html?id=${product.id}'">
                        <img src="${product.image}" alt="product">
                    </div>
                    <div class="productCard">
                        <div class="productInfo">
                            <p>${product.name}</p>
                            <strong>${product.price.toFormat()} €</strong>
                        </div>
                        <div class="productCardImage">
                            <img src="./img/${elementInCart ? 'update' : 'cart'}.png" alt="${elementInCart ? 'update' : 'add'}-cart" id="${elementInCart ? 'update' : 'addCart'}-${product.id}" loading="lazy">
                        </div>
                    </div>
                </div>`

    }).join("\n");
}

onclick = async (event) => {
    if (event.target.id.startsWith("addCart-")) {
        const id = parseInt(event.target.id.replace(/addCart-/, ''));
        const product = (await findProduct(id))[0];
        if (product)
            addProduct(product).then(() => loadPreview())
    }
    if (event.target.id.startsWith("update-")) {
        const id = parseInt(event.target.id.replace(/update-/, ''));
        changeAmountProduct(id).then(() => loadPreview())
    }
}