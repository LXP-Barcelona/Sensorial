window.onload = () => {
    loadLang();
    loadPreview();
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hiddenLoader");
    }, 250)
}

async function loadPreview() {
    const productsPreviewContainer = document.getElementById("productsPreviewContainer");
    productsPreviewContainer.innerHTML = (await findProduct("1,2,3,4,5,6")).map(product => (
        `<div class="productPreview">
            <div class="productImage"  onclick="document.location.href = 'product.html?id=${product.id}'">
                <img src="${product.image}" alt="product">
            </div>
            <div class="productCard">
                <div class="productInfo">
                    <a>${product.name}</a>
                    <br>
                    <strong>${product.price.toFormat()} €</strong>
                </div>
                <div class="productCardImage">
                    <img src="./img/cart.png" alt="shopping bag" id="addCart-${product.id}">
                </div>
            </div>
        </div>`
)).join("\n");
}