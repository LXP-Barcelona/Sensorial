const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-custom'
})

function getCartOrCreate() {
    const cart = localStorage.getItem("cart");
    return JSON.parse(cart) || [];
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

function changeAmountProduct(productId) {
    return new Promise(async resolve => {
        const cart = getCartOrCreate();
        const productFind = (await findProduct(productId))[0];
        const product = {
            product: productFind,
            amount: cart.find(p => p.id === productId)?.amount ?? 0
        };

        Swal.fire({
            title: `${product.product.name}`,
            icon: 'question',
            input: 'range',
            inputLabel: `x${product.amount} (${(product.amount*product.product.price).toFormat()} €)`,
            inputAttributes: {
              min: 0,
              max: product.amount+10,
              step: 1
            },
            inputValue: product.amount,
            didOpen: () => {
              Swal.getInput().addEventListener('change', () => {
                const amount = Swal.getInput().value;
                Swal.getInputLabel().innerText = `x${amount} (${(amount*product.product.price).toFormat()} €)`;
              })
            }
        }).then(result => {
            if (result.isConfirmed) {
                const newAmount = parseInt(result.value);
                if (newAmount === product.amount) return;
                if (newAmount === 0)
                    setCart(cart.filter(c => c.id !== productId));
                else {
                    cart.find(p => p.id === productId).amount = newAmount;
                    setCart(cart);
                }
                Toast.fire({
                    icon: 'success',
                    title: `${translate("cart-update")}\nx${newAmount} ${product.product.name} (${(product.product.price*newAmount).toFormat()} €)`
                });
                resolve();
            }
          })
    })
}

function addProduct(product) {
    return new Promise(resolve => {
        askAmount(`${product.name} (${product.price.toFormat()} €)`, translate("cart-askAmount"), 1, 10).then(amount => {
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
                title: `${translate("cart-add")}\nx${amount} ${product.name} (${(product.price*amount).toFormat()} €)`
            });
            resolve();
        })
    })
}


