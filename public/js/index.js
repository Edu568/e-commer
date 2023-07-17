let burgerMenu = document.querySelector(".toggle-nav");
let btnclose = document.querySelector("#btn-close");
let menuContainer = document.querySelector(".main-nav");

burgerMenu.addEventListener("click", () => {
      menuContainer.classList.add("active");
});

btnclose.addEventListener("click", () => {
      menuContainer.classList.remove("active");
});

/* document.querySelector(".icon-delete").addEventListener("click", () => {
      console.log("eliminar");
}); */

const collection = document.querySelectorAll(".icon-delete");
const collectionShopping = document.querySelectorAll(".shopping-cart-container");

for (let i = 0; i < collection.length; i++) {
      collection[i].addEventListener("click", () => {
            console.log("hola");
            collectionShopping[i].remove();
      });
}
