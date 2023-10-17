const langs = {
    en: {
        "name": "English",
        "change-lang": "You can choose another language",
        "404": "Page not found",

        "home-title": "Smell & Relax",
        "home-description": "Sensorial is a company dedicated to the well being of it's customers, in body and spirit, thanks to our essential oils, which not only work as a soothing fragrance, but also serves medicinal purposes. We also aim to present the best products possible to our customers, with good quality, natural and organic ingredients.",
        "home-bestSeller": "Our Best Sellers",
        "cart-remove": "You've removed",
        "cart-add": "You've added",
        "cart-update": "You've updated",
        "cart-askAmount": "Select the desired quantity",
        "cart-empty": "Your cart does not contain any items.",
        "cart-total": "TOTAL",
        "cart-buy": "BUY &gt;",
        "cart-yourProduct": "Your Products",
        "product-description": "Product's Description",
        "product-composition": "Composition",
        "product-reviews": "Reviews",
        "products-products": "Products",
        "header-products": "PRODUCTS",
        "header-cart": "CART"
    },
    fr: {
        "name": "Français",
        "change-lang": "Vous pouvez choisir une autre langue",
        "404": "Page non trouvée",

        "home-title": "Smell & Relax",
        "home-description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "home-bestSeller": "Nos Meilleures Ventes",
        "cart-remove": "Vous avez supprimé",
        "cart-add": "Vous avez ajouté",
        "cart-update": "Vous avez mis a jour",
        "cart-askAmount": "Sélectionnez la quantité souhaitée",
        "cart-empty": "Votre panier ne contient aucun article.",
        "cart-total": "TOTAL",
        "cart-buy": "ACHETER &gt;",
        "cart-yourProduct": "Vos Produits",
        "product-description": "Description du Produit",
        "product-composition": "Composition",
        "product-reviews": "Avis",
        "products-products": "Produits",
        "header-products": "PRODUITS",
        "header-cart": "PANIER"
    },
    es: {
        "name": "Español",
        "change-lang": "Puedes elegir otro idioma",
        "404": "Página no encontrada",

        "home-title": "Smell & Relax",
        "home-description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "home-bestSeller": "Nuestros Mejores Vendedores",
        "cart-remove": "Has eliminado",
        "cart-add": "Has añadido",
        "cart-update": "Has update",
        "cart-askAmount": "Selecciona la cantidad deseada",
        "cart-empty": "Tu carrito no contiene ningún artículo.",
        "cart-total": "TOTAL",
        "cart-buy": "COMPRAR &gt;",
        "cart-yourProduct": "Tus Productos",
        "product-description": "Descripción del Producto",
        "product-composition": "Composición",
        "product-reviews": "Opiniones",
        "products-products": "Productos",
        "header-products": "PRODUCTOS",
        "header-cart": "CARRITO"
    }    
};





function loadLang() {
    const lang = getLang();
    const elements = document.querySelectorAll('[translate]');
    const langFound = {...langs.en, ...langs[lang]};
    elements.forEach(element => {
        element.innerHTML = langFound[element.getAttribute("translate")];  
    });
}

function translate(key) {
    const lang = getLang();
    const langFound = {...langs.en, ...langs[lang]};
    return langFound[key];
}

function getLang() {
    let lang = localStorage.getItem("lang");
    if (!lang)
        localStorage.setItem("lang", "en");
        lang = localStorage.getItem("lang");
    return lang;
}


window.addEventListener("click", (event) => {
    const transformedLangs = Object.keys(langs).reduce((acc, key) => ({ ...acc, [key]: langs[key].name }), {});
    if (event.target.id === "change-lang") {
        Swal.fire({
            title: translate("change-lang"),
            input: 'select',
            inputOptions: transformedLangs,
            inputValue: getLang(),
            didOpen: () => {
              Swal.getInput().addEventListener('change', () => {
                localStorage.setItem("lang", Swal.getInput().value);
                Swal.getTitle().innerText = translate("change-lang");
              })
            },
            allowOutsideClick: () => {
                const popup = Swal.getPopup()
                popup.classList.remove('swal2-show')
                setTimeout(() => {
                  popup.classList.add('animate__animated', 'animate__headShake')
                })
                setTimeout(() => {
                  popup.classList.remove('animate__animated', 'animate__headShake')
                }, 500)
                return false;
              }
          }).then(result => {
            if (result.isConfirmed)
                document.location.reload();
          })
    }
})