let products = [];

onload = () => {
    loadLang();
    loadProducts()
}

async function loadProducts() {
    getAllProducts().then(productList => {
        products = productList;

        const categoryList = document.getElementById('categoryList');
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        categoryList.innerHTML = uniqueCategories.map(category => (
            `<button id="category.${category.replace(/ /g, '-')}">${category}</button>`
        )).join("\n");
        showProducts();
        const loader = document.getElementById("loader");
        setTimeout(() => {
            loader.classList.add("hiddenLoader");
        }, 250);
    })
}


function showProducts(category = null) {
    const cart = getCartOrCreate();
    document.title = `Sensorial - ${category || 'All products'}`
    const productsPreviewContainer = document.getElementById("productsPreviewContainer");
    productsPreviewContainer.innerHTML = products.filter(p => category ? p.category === category : true).map(product => {
        const elementInCart = cart.find(c => c.id === product.id);
        return `<div class="productPreview">
                    <div class="AmountBandContainer">
                        <div class="AmountBand">
                            x${elementInCart?.amount || 0}
                        </div>
                    </div>
                    <div class="productImage"  onclick="document.location.href = 'product.html?id=${product.id}'">
                        <img src="${product.image}" alt="product" rel="preload">
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

let lastActive = null;

onclick = async (event) => {
    if (event.target.id.startsWith("category.")) {
        const category = event.target.id.replace(/category./, '').replace(/-/g, ' ');
        if (lastActive && event.target === lastActive) {
            lastActive.classList.remove('active');
            lastActive = null;
            return showProducts();
        }
        showProducts(category);
        if (lastActive)
            lastActive.classList.remove('active');
        event.target.classList.add('active');
        lastActive = event.target;
    }

    const category = lastActive ? lastActive.id.replace(/category./, '').replace(/-/g, ' ') : null;

    if (event.target.id.startsWith("addCart-")) {
        const id = parseInt(event.target.id.replace(/addCart-/, ''));
        const product = (await findProduct(id))[0];
        if (product)
            addProduct(product).then(() => showProducts(category))
    }
    if (event.target.id.startsWith("update-")) {
        const id = parseInt(event.target.id.replace(/update-/, ''));
        changeAmountProduct(id).then(() => showProducts(category))
    }
}