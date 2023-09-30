const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-custom'
})

function getCartOrCreate() {
    let cart = localStorage.getItem("cart");
    if (!cart)
        localStorage.setItem("cart", JSON.stringify([]));
    cart = localStorage.getItem("cart");
    return JSON.parse(cart);
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
    localStorage.removeItem("cart");
}

function askAmount(title, label, min = 1, max = 1) {
    return new Promise((resolve) => {
        Swal.fire({
            title,
            icon: 'question',
            input: 'range',
            inputLabel: label,
            inputAttributes: {
              min,
              max,
              step: 1
            },
            inputValue: 1
          }).then(result => {
            if (result.isConfirmed)
                resolve(parseInt(result.value));
          })
    })
}

function removeProduct(productId) {
    return new Promise(async resolve => {
        const cart = getCartOrCreate();
        const products = await getAllProducts();
        const product = {
            product: products.find(p => p.id === productId),
            amount: cart.find(p => p.id === productId)?.amount ?? 0
        };
        askAmount(`${product.product.name} (x${product.amount} ${product.product.price.toFormat()} €)`, "Select the desired quantity", 1, product.amount).then(amount => {
            if (amount === product.amount)
                setCart(cart.filter(c => c.id !== productId));
            else {
                cart.find(p => p.id === productId).amount -= amount;
                setCart(cart);
            }
            Toast.fire({
                icon: 'success',
                title: `you just removed\nx${amount} ${product.product.name} (${(product.product.price*amount).toFormat()} €)`
            });
            resolve();
        })
    })
}

function addProduct(product) {
    askAmount(`${product.name} (${product.price.toFormat()} €)`, "Select the desired quantity", 1, 10).then(amount => {
        const cart = getCartOrCreate();
        const element = cart.find(c => c.id === product.id);
        if (!element)
            cart.push({
                id: product.id,
                amount: amount
            })
        else
            element.amount += amount;
        setCart(cart);
        Toast.fire({
            icon: 'success',
            title: `you just added\nx${amount} ${product.name} (${(product.price*amount).toFormat()} €)`
        })
    })
}


onclick = async (event) => {
    if (event.target.id.startsWith("addCart-")) {
        const id = parseInt(event.target.id.replace(/addCart-/, ''));
        const product = await findProduct(id);
        if (product)
            addProduct(product);
    }
}