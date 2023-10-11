Number.prototype.toFormat = function (number = null) {
    return `${(number ? number : this).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")}`;
};

function getAllProducts() {
    return new Promise((resolve) => {
        fetch(`https://api-sensorial.vercel.app/api/products?lang=${getLang()}`).then(async r => {
            resolve(await r.json());
        })
    })
}

async function findProduct(id) {
    return new Promise(resolve => {
        fetch(`http://localhost:8080/api/product/${id}?lang=${getLang()}`).then(async r => {
            resolve(await r.json());
        })
    })
}