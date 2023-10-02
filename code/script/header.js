window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    if (window.pageYOffset > 0) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
})