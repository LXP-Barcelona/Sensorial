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
    const productsPreviewContainer = document.getElementById("productsPreviewContainer");
    productsPreviewContainer.innerHTML = products.filter(p => category ? p.category === category : true).map(product => (
        `<div class="productPreview">
        <div class="productImage"  onclick="document.location.href = 'product.html?id=${product.id}'">
            <img src="${product.image}" alt="product" loading="lazy">
        </div>
        <div class="productCard">
            <div class="productInfo">
                <a>${product.name}</a>
                <br>
                <strong>${product.price.toFormat()} €</strong>
            </div>
            <div class="productCardImage">
                <img src="./img/cart.png" alt="shopping bag" id="addCart-${product.id}" loading="lazy">
            </div>
        </div>
    </div>`
    )).join("\n");

}

let lastActive = null;

onclick = async (event) => {
    if (event.target.id.startsWith("category.")) {
        const category = event.target.id.replace(/category./, '').replace(/-/, ' ');
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
    }else if (event.target.id.startsWith("addCart-")) {
        const id = parseInt(event.target.id.replace(/addCart-/, ''));
        const product = (await findProduct(id))[0];
        if (product)
            addProduct(product);
    }
}