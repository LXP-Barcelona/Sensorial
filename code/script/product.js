
onload = async () => {
    loadLang();
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
        document.location.href = 'home.html';
    }
}