const products = [
    {
        id: 1,
        name: "Iphone 14",
        price: 9020,
        image: "https://storage.googleapis.com/alpine-inkwell-325917.appspot.com/devices/iphone-14-header.png"
    },
    {
        id: 2,
        name: "Iphone XR",
        price: 560,
        image: "https://www.barcimaster.com/wp-content/uploads/2020/10/iphone-xr-black-select-201809.png"
    },
    {
        id: 3,
        name: "Iphone X",
        price: 120,
        image: "https://www.barcimaster.com/wp-content/uploads/2020/10/iphone-xr-black-select-201809.png"
    },
    {
        id: 4,
        name: "Iphone 12",
        price: 200,
        image: "https://www.barcimaster.com/wp-content/uploads/2020/10/iphone-xr-black-select-201809.png"
    }
];

function findProduct(idOrName) {
    return products.find(p => (typeof idOrName === "number" ? p.id : p.name) === idOrName );
}

function getAllProducts() {
    return products;
}