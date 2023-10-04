const langs = {
    en: {
        "home-title": "Catch phrase",
        "home-description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "home-bestSeller": "Our Best Sellers",
        "cart-remove": "You've removed",
        "cart-add": "You've added",
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
        "home-title": "Phrase d'accroche",
        "home-description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "home-bestSeller": "Nos Meilleures Ventes",
        "cart-remove": "Vous avez supprimé",
        "cart-add": "Vous avez ajouté",
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
