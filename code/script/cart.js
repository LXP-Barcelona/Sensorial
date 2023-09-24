const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
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