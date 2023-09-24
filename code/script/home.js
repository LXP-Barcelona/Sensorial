Number.prototype.toFormat = function (number = null) {
    return `${(number ? number : this).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")}`;
};

window.onload = () => {
    console.log(getCartOrCreate())
    loadPreview();
}

function loadPreview() {
    const productPreviewContainer = document.getElementById("productPreviewContainer");
    productPreviewContainer.innerHTML = getAllProducts().slice(0, 6).map(product => {
        return `<div class="productPreview">
        <img src="${product.image}" alt="${product.name}">
        <h3 class="productTitle">${product.name}</h3>
        <h3 class="price">${product.price.toFormat()} €</h3>
        <button class="addCart" id="addCart-${product.id}">Add to cart</button>
    </div>`;
    }).join("\n");
}

onclick = (event) => {
    if (event.target.id.startsWith("addCart-")) {
        const id = parseInt(event.target.id.replace(/addCart-/, ''));
        const product = findProduct(id);
        if (product)
            addProduct(product);
    }
}