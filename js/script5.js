// DEFINIR CLASE Y OBJETOS
class Product {
  constructor(id, name, price, img, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.quantity = quantity;
  }
}
const prod1 = new Product(1, "Peluche de panditas", 1500, "./img/prod1.webp", 0);
const prod2 = new Product(2, "Peluche de patito", 1500, "./img/prod2.webp", 0);
const prod3 = new Product(3, "Peluche de gatito", 2000, "./img/prod3.webp", 0);
const prod4 = new Product(4, "Peluche de paltita", 2000, "./img/prod4.webp", 0);
const prod5 = new Product(5, "Peluche de ositos", 2000, "./img/prod5.webp", 0);
const prod6 = new Product(6, "Peluche de solcito", 1000, "./img/prod6.webp", 0);
const prod7 = new Product(7, "Peluche de honguito", 1000, "./img/prod7.webp", 0);
const prod8 = new Product(8, "Peluche de sapito", 1500, "./img/prod8.webp", 0);
const prod9 = new Product(9, "Peluche de carpincho", 2000, "./img/prod9.webp", 0);

const product = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9];


//DOM - AGREGA LOS OBJECTOS (PRODUCTOS) A LA SECCIÓN "TIENDA"
product.forEach(products => {

    let divProducts = document.createElement("div");
    document.querySelector(".shop-items").appendChild(divProducts);
    divProducts.classList.add("shop-item");
    divProducts.classList.add(`${products.id}`);
  
    let imgProducts = document.createElement("img");
    imgProducts.classList.add("shop-item-img");
    imgProducts.src = `${products.img}`;
    imgProducts.alt = `${products.id}`;
  
    let nameProducts = document.createElement("p");
    nameProducts.classList.add("shop-item-name");
    nameProducts.innerText = `${products.name}`;
  
    let priceProducts = document.createElement("p");
    priceProducts.classList.add("shop-item-price");
    priceProducts.innerText = `$${products.price}`;
  
    let removeFromCartProducts = document.createElement("button");
    removeFromCartProducts.classList.add("shop-remove-item-button");

    let quantityCart = document.createElement("input");
    quantityCart.classList.add("cart-item-quantity");
    quantityCart.disabled = true;
    quantityCart.value = `${products.quantity}`;

    let addToCartProducts = document.createElement("button");
    addToCartProducts.classList.add("shop-add-item-button");
    addToCartProducts.innerText = "+";

    divProducts.append(imgProducts, nameProducts, priceProducts, removeFromCartProducts, quantityCart, addToCartProducts);

    //Agrego el ícono de tacho de basura
    let removeFromCartProductsIcon = document.createElement("i");
    removeFromCartProductsIcon.classList.add("fa-solid", "fa-trash-can");
    removeFromCartProducts.append(removeFromCartProductsIcon);

    //Cuando actualizo la página, quiero que me aparezca la quantity actualizada según el localStorage
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    if (productsInCart != null && productsInCart[products.name]) {
        quantityCart.value = productsInCart[products.name].quantity;
    }
});



//EVENTO ADD TO CART (clickeo el botón "agregar al carrito" de la lista de productos para agregar un item)
const buttonAddToCart = document.querySelectorAll(".shop-add-item-button");
for (let i = 0 ; i < buttonAddToCart.length ; i++) {
    buttonAddToCart[i].addEventListener("click", () => {
        addToCart(product[i]);
    })
}

//EVENTO REMOVE FROM CART (clickeo el botón "quitar del carrito" de la lista de productos para eliminar una linea de producto)
const buttonRemoveFromCart = document.querySelectorAll(".shop-remove-item-button");
for (let i = 0 ; i < buttonRemoveFromCart.length ; i++) {
    buttonRemoveFromCart[i].addEventListener("click", () => {
        removeFromCart(product[i]);
    })
}


//FUNCION LOADING CART (mantenemos las unidades de producto en nuestro icon carrito cuando refrescamos)
const loadingCart = () => {

    let quantityNumber = localStorage.getItem("quantityInCart");
    let cartNumber = document.querySelector(".cartIcon div");

    if (quantityNumber) {  //Si hay algo en mi storage, que se muestre en mi icon carrito
        cartNumber.innerText = quantityNumber;
    }
}


//FUNCION ADDING TO CART (agregamos productos a nuestro carrito del localStorage)
const addToCart = product => {

    let quantityNumber = parseInt(localStorage.getItem("quantityInCart"));
    let cartNumber = document.querySelector(".cartIcon div");

    if (!quantityNumber) {
        localStorage.setItem("quantityInCart", 1);  //Si no existe, lo creo y que empiece en 1
        cartNumber.innerText = 1;
    } else {
        localStorage.setItem("quantityInCart", quantityNumber + 1); //Si existe, que agregue de a 1 unidad por click
        cartNumber.innerText = quantityNumber + 1;
    }

    modifyProductQuantity(product);
    calculateTotalCost(product);
    showInCartDOM(product);
    showToastify(product);
}


//FUNCION MAINTEIN CART DOM (muestro mi carrito en DOM aunque refresque la página)
const mainteinCartDOM = () => {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);


    if (cartItems) {
        Object.values(cartItems).map(products => {

            if (cartItems[products.name].quantity != 0) {

            let divCart = document.createElement("div");
            document.querySelector(".cart-items").appendChild(divCart);
            divCart.classList.add("cart-item");
            divCart.setAttribute("id", `${[products.id]}`);
        
            let imgCart = document.createElement("img");
            imgCart.classList.add("cart-item-img");
            imgCart.src = `${[products.img]}`;
            imgCart.alt = `${[products.id]}`;
        
            let nameCart = document.createElement("p");
            nameCart.classList.add("cart-item-name");
            nameCart.innerText = `${[products.name]}`;
        
            let priceCart = document.createElement("p");
            priceCart.classList.add("cart-item-price");
            priceCart.innerText = "$" + cartItems[products.name].quantity * products.price;
        
            let quantityCart = document.createElement("input");
            quantityCart.classList.add("cart-item-quantity");
            quantityCart.disabled = true;
            quantityCart.value = cartItems[products.name].quantity;
                
            divCart.append(imgCart, nameCart, priceCart, quantityCart); 

            let totalCost = localStorage.getItem("totalCostInCart");
            let pPrice = document.querySelector(".cart-price");
            pPrice.innerText = "$" + totalCost; 
            }
        })   
    } 
}


//FUNCION ADD TO CART DOM (muestro los productos seleccionados en mi carrito HTML)
const showInCartDOM = product => {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let ifIdExist = document.getElementById(`${[product.id]}`) //Veo si el ID existe o no (si no está creado, no existe y el quantity será 1)

    if (ifIdExist === null && cartItems) {   // DOM (agrego los productos del local storage al carrito HTML)
    
    let divCart = document.createElement("div");
    document.querySelector(".cart-items").appendChild(divCart);
    divCart.classList.add("cart-item");
    divCart.setAttribute("id", `${[product.id]}`);
  
    let imgCart = document.createElement("img");
    imgCart.classList.add("cart-item-img");
    imgCart.src = `${[product.img]}`;
    imgCart.alt = `${[product.id]}`;
  
    let nameCart = document.createElement("p");
    nameCart.classList.add("cart-item-name");
    nameCart.innerText = `${[product.name]}`;
  
    let priceCart = document.createElement("p");
    priceCart.classList.add("cart-item-price");
    priceCart.innerText = "$" + `${[product.price]}`;

    let quantityCart = document.createElement("input");
    quantityCart.classList.add("cart-item-quantity");
    quantityCart.disabled = true;
    quantityCart.value = cartItems[product.name].quantity;

    //La primera vez que clickee "Agregar al carrito", quiero que me aparezca 1 como cantidad en mi input TIENDA
    let inputSelectorShop = document.getElementsByClassName(`${[product.id]}`)[0].querySelector(".cart-item-quantity");
    inputSelectorShop.value = 1;
  
    divCart.append(imgCart, nameCart, priceCart, quantityCart); 

    // Agrego el precio total al final
    let totalCost = localStorage.getItem("totalCostInCart");
    let pPrice = document.querySelector(".cart-price");
    pPrice.innerText = "$" + totalCost; 

    }
    else { //Si el producto ya tiene una unidad en el carrito, solo modifico el value de la cantidad
        //En el input de CARRITO
        let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        let quantityInCart = productsInCart[product.name].quantity; //La quantity que tengo de cada producto
        let inputSelectorCart = document.getElementById([product.id]).querySelector(".cart-item-quantity");
        let inputSelectorPrice = document.getElementById([product.id]).querySelector(".cart-item-price");
        inputSelectorCart.value = quantityInCart;
        inputSelectorPrice.innerText = "$" + quantityInCart * product.price;

        //En el input de TIENDA
        let inputSelectorShop = document.getElementsByClassName(`${[product.id]}`)[0].querySelector(".cart-item-quantity");
        inputSelectorShop.value = quantityInCart;

        // Agrego el precio total al final
        let totalCost = localStorage.getItem("totalCostInCart");
        let pPrice = document.querySelector(".cart-price");
        pPrice.innerText = "$" + totalCost; 
    }
}


//FUNCION MODIFY PRODUCT QUANTITY (modifica el parámetro quantity de cada objeto según si agrego productos al carrito)
const modifyProductQuantity = product => {

    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

    if (productsInCart != null) { //si ya existe un producto en mi carrito y quiero agregar otro nuevo
        if (productsInCart[product.name] === undefined) {
            productsInCart = {
                ...productsInCart,   //dejo lo que ya estaba en mi carrito
                [product.name]: product  //y agrego el nuevo producto
            }
        }
        productsInCart[product.name].quantity++;
    } else {   //si no existe un producto en mi carrito
        product.quantity = 1;
        productsInCart = {[product.name]: product}  //lo agrego a mi carrito y dejo quantity = 1
    }

    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}

const calculateTotalCost = product => {

    let totalCostInCart = localStorage.getItem("totalCostInCart");

    totalCostInCart != null ? localStorage.setItem("totalCostInCart", parseInt(totalCostInCart) + product.price)
                            : localStorage.setItem("totalCostInCart", product.price);
}

//FUNCION REMOVE FROM CART (modifica la cantidad de productos en el carrito al apretar el boton "quitar del carrito")
const removeFromCart = product => {

    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    let quantityNumber = parseInt(localStorage.getItem("quantityInCart"));
    let cartNumber = document.querySelector(".cartIcon div");

    //Modifico el precio final por los items eliminados en mi localStorage
    let totalCostInCart = localStorage.getItem("totalCostInCart");
    localStorage.setItem("totalCostInCart", parseInt(totalCostInCart) - (product.price * productsInCart[product.name].quantity))

    //Modifico el precio total en el carrito DOM 
    let totalCost = localStorage.getItem("totalCostInCart");
    let pPrice = document.querySelector(".cart-price");
    pPrice.innerText = "$" + totalCost; 

    //Elimino toda la cantidad de elementos de quantityInCart
    localStorage.setItem("quantityInCart", quantityNumber - productsInCart[product.name].quantity); 

    //Elimino toda la cantidad de elementos del carrito DOM
    cartNumber.innerText = quantityNumber - productsInCart[product.name].quantity; 

    //Modifico la quantity de mi producto a 0 en el localStorage
    productsInCart[product.name].quantity = 0; 
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

    //Elimino el producto entero del DOM
    document.querySelector(".cart-items").removeChild(document.getElementById(`${[product.id]}`));

    //Elimino la cantidad del input tienda (la dejo en 0)
    let inputSelectorShop = document.getElementsByClassName(`${[product.id]}`)[0].querySelector(".cart-item-quantity");
    inputSelectorShop.value = 0;
}

//FUNCION SHOW TOASTIFY (se activa la libreria Toastify)
const showToastify = product => {
    Toastify({
        text: "Agregaste " + product.name + " al carrito!",
        duration: 1000,
        newWindow: true,
        close: false,
        gravity: "bottom",
        position: "right",
        style: {
          background: "var(--blue-color)",
          fontSize: "15px",
          borderRadius: "10px"
        },
        onClick: function(){} 
      }).showToast();
}

//EVENTO MESSAGE BUY ITEMS (clickeo el botón "comprar" y me aparece un toast)
const buttonMessageBuyItems = document.querySelector(".cart-buy-button");
buttonMessageBuyItems.addEventListener("click", () => {
    Toastify({
        text: "Gracias por tu compra!",
        duration: 2000,
        newWindow: true,
        close: false,
        gravity: "bottom",
        position: "right",
        style: {
          background: "var(--pink-color)",
          fontSize: "15px",
          borderRadius: "10px",
          color: "#000"
        },
        onClick: function(){} 
      }).showToast();
    })

//EVENTO MESSAGE BUY ITEMS (clickeo el botón "nuestra inspiración" y aparecen fotos de gatitos en Toastify)
const buttonCatAPI = document.querySelector(".us-text-button-cats");
buttonCatAPI.addEventListener("click", () => {
    fetch("https://api.thecatapi.com/v1/images/search")
    .then(response => response.json())
    .then(data => {
        let catImg = data[0].url;
        Toastify({
            avatar: catImg,
            text: " ",
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "left",
            style: {
                background: "none",
                boxShadow: "none",
                width: "40%",
            },
            onClick: function(){} 
        }).showToast();
    })
})

loadingCart();
mainteinCartDOM();