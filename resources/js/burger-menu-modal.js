let burgerMenu = document.querySelector("#burger-menu");
let nav = document.querySelector(".navbar");

burgerMenu.addEventListener("click",() => {
    nav.classList.toggle("navbarShow");
})

