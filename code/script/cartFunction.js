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

async function removeProduct(productId) {
    const cart = getCartOrCreate();
    setCart(cart.filter(c => c.id !== productId));
    const products = await getAllProducts();
    const product = {
        product: products.find(p => p.id === productId),
        amount: cart.find(p => p.id === productId)?.amount ?? 0
    };
    Toast.fire({
        icon: 'success',
        title: `you just removed\nx${product.amount} ${product.product.name} (${(product.product.price*product.amount).toFormat()} €)`
    })
}

function addProduct(product, amount = 1) {
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
}


onclick = async (event) => {
    if (event.target.id.startsWith("addCart-")) {
        const id = parseInt(event.target.id.replace(/addCart-/, ''));
        const product = await findProduct(id);
        if (product)
            addProduct(product);
    }
}