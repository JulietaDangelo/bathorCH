/********* MENU HAMBURGUESA *********/

const hamburguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const body = document.querySelector("body");


// Abrir menu hamburguesa
hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");
  navMenu.classList.toggle("active");
})

// Para cerrar una vez que se haga click en el link
 navLink.forEach(n =>
   n.addEventListener("click", () => {
     hamburguer.classList.remove("active");
     navMenu.classList.remove("active");
   }));
  


/********* BOTON CARRITO *********/

const cartButton = document.querySelector(".cart-icon");
const cartList = document.querySelector(".cart");

// Abrir carrito
cartButton.addEventListener("click", e => {
  if (!cartList.classList.contains("active")) {
    cartList.classList.toggle("active");
    cartList.style.display = "block";
    e.preventDefault(); // cuando clickee el carrito, no quiero que la página se vaya hacia arriba
  } else {
    cartList.classList.remove("active");
    cartList.style.display = "none";
    e.preventDefault();
  }
})






