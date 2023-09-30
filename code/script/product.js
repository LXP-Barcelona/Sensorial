Number.prototype.toFormat = function (number = null) {
    return `${(number ? number : this).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")}`;
};

onload = async () => {
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
        productName.innerText = product.name;

        const productPrice = document.getElementById("productPrice");
        productPrice.innerText = `${product.price.toFormat()} €`;

        const productIdButton = document.getElementById("addCart-");
        productIdButton.id = `addCart-${product.id}`;

        const productDescription = document.getElementById("productDescription");
        productDescription.innerText = product.description;

        const productComposition = document.getElementById("productComposition");
        productComposition.innerText = product.specification;

        const loader = document.getElementById("loader");
        setTimeout(() => {
            loader.classList.add("hiddenLoader");
        }, 250)
    }catch (_) {
        document.location.href = 'home.html';
    }
}