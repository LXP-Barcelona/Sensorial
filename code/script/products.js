function getAllProducts() {
    return new Promise((resolve) => {
        fetch("https://lxp-barcelona.github.io/Data/db.json").then(async r => {
            resolve(await r.json());
        })
    })
}

async function findProduct(idOrName) {
    return (await getAllProducts()).find(p => (typeof idOrName === "number" ? p.id : p.name) === idOrName );
}