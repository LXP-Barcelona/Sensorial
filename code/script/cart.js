onload = () => {
    loadLang();
    loadCart();
};


async function loadCart() {
    const cart = getCartOrCreate();
    let myProduct = [];
    if (cart.length > 0) {
        const products = await findProduct(cart.map(c => c.id).join(","));
        myProduct = cart.map(c => ({
            amount: c.amount,
            product: products.find(p => p.id === c.id)
        }));
    }
    const yourProduct = document.getElementById("yourProduct");
    const totalPrice = myProduct.reduce((total, item) => total + (item.product.price * item.amount), 0);
    const amountTotal = document.getElementById('amountTotal');
    amountTotal.innerHTML = `${totalPrice.toFormat()} €`;

    yourProduct.innerHTML = myProduct.length > 0 ? `${myProduct.map(product => (
    `<div class="productPreview">
        <div class="AmountBandContainer">
            <div class="AmountBand">
                x${product.amount}
            </div>
        </div>
        <div class="productImage" onclick="document.location.href = 'product.html?id=${product.product.id}'">
            <img src="${product.product.image}" alt="product" rel="preload">
        </div>
        <div class="productCard">
            <div class="productInfo">
                <p>${product.product.name}</p>
                <strong>${(product.amount*product.product.price).toFormat()} €</strong>
            </div>
            <div class="productCardImage">
                <img src="./img/update.png" alt="update-cart" id="update-${product.product.id}" rel="preload">
            </div>
        </div>
    </div>`
    )).join("\n")}` : translate("cart-empty");

    const buyButton = document.getElementById('buy-button');
    buyButton.addEventListener('click', () => {
        buy();
    })

    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hiddenLoader");
    }, 250)
}

onclick = async (event) => {
    if (event.target.id.startsWith("update-")) {
        const id = parseInt(event.target.id.replace(/update-/, ''));
        changeAmountProduct(id).then(() => loadCart())
    }
}



function buy() {
    const cart = getCartOrCreate();
    if (cart.length < 1) return;
    console.log('Connecting with payment services...');
    fetch(`https://api-sensorial.vercel.app/api/create-checkout-session`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart)
    }).then((res) => res.json())
    .then((data) => {
      window.location.href = data.url;
    });
}








async function goToStripe() {
    // Get products from localstorage.
    const cart = getCartData();
  
    const body = cart.map((product) => {
      return {
        price: product.stripe_price_id,
        quantity: product.quantity,
      };
    });
  
    // Connect with payment service.
    console.log("Connecting with Payment Services...");
    fetch("http://localhost:8080/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.url;
      });
  }