
onload = async () => {
    loadLang();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (!urlParams.has("id"))
        return document.location.href = 'home.html';

    try {
        const id = parseInt(urlParams.get('id'));
        const product = await findProduct(id);
        if (!product)
            return document.location.href = 'home.html';
        
        const productImage = document.getElementById("productImage");
        productImage.src = product.image;
        productImage.alt = product.name;

        const productName = document.getElementById("productName");
        productName.innerHTML = product.name;

        const productPrice = document.getElementById("productPrice");
        productPrice.innerHTML = `${product.price.toFormat()} €`;

        const productIdButton = document.getElementById("addCart-");
        productIdButton.id = `addCart-${product.id}`;

        const productDescription = document.getElementById("productDescription");
        productDescription.innerHTML = product.description;

        const productComposition = document.getElementById("productComposition");
        productComposition.innerHTML = product.specification;

        const loader = document.getElementById("loader");
        setTimeout(() => {
            loader.classList.add("hiddenLoader");
        }, 250)
    }catch (_) {
        document.location.href = 'home.html';
    }
}