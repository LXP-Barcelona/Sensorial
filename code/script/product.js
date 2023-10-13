
onload = async () => {
    loadLang();
    loadProduct()
}

async function loadProduct() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (!urlParams.has("id"))
        return document.location.href = 'home.html';

    try {
        let id = parseInt(urlParams.get('id'));
        const maxProductCount = await getMaxProduct();
        const product = (await findProduct(id))[0];

        if (!product)
            return document.location.href = 'home.html';
        const cart = getCartOrCreate();
        const elementInCart = cart.find(c => c.id === product.id);

        const amountBand = document.getElementById('amountBand');
            amountBand.innerText = `x${elementInCart?.amount || 0}`;

        const productImage = document.getElementById("productImage");
        productImage.src = product.image;
        productImage.alt = product.name;

        const productName = document.getElementById("productName");
        productName.innerHTML = product.name;

        const productPrice = document.getElementById("productPrice");
        productPrice.innerHTML = `${product.price.toFormat()} €`;

        const productIdButton = document.querySelector("img[cart]");
        productIdButton.id = `${elementInCart ? 'update' : 'addCart'}-${product.id}`;
        productIdButton.src = `./img/${elementInCart ? 'update' : 'cart'}.png`;
        productIdButton.alt = `${elementInCart ? 'update' : 'add'}-cart`;

        const productDescription = document.getElementById("productDescription");
        productDescription.innerHTML = product.description;

        const productComposition = document.getElementById("productComposition");
        productComposition.innerHTML = product.specification;

        const productBack = document.getElementById('product-back');

        productBack.onclick = () => {
            const newId = id-1;
            document.location.href = `product.html?id=${newId < 1 ? maxProductCount.max : newId}`;
        }
        const productNext = document.getElementById('product-next');
        productNext.onclick = () => {
            const newId = id+1;
            document.location.href = `product.html?id=${newId > maxProductCount.max ? 1 : newId}`;
        }

        const loader = document.getElementById("loader");
        setTimeout(() => {
            loader.classList.add("hiddenLoader");
        }, 250)
    }catch (_) {
        console.log(_)
        document.location.href = 'home.html';
    }
}

onclick = async (event) => {
    if (event.target.id.startsWith("addCart-")) {
        const id = parseInt(event.target.id.replace(/addCart-/, ''));
        const product = (await findProduct(id))[0];
        if (product)
            addProduct(product).then(() => loadProduct())
    }
    if (event.target.id.startsWith("update-")) {
        const id = parseInt(event.target.id.replace(/update-/, ''));
        changeAmountProduct(id).then(() => loadProduct())
    }
}