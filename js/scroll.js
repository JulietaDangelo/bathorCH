let usButton = document.querySelectorAll(".us-button");
let shopButton = document.querySelectorAll(".shop-button");
let contactButton = document.querySelectorAll(".contact-button");
let usTextButton = document.querySelectorAll(".us-text-button");

let usSection = document.getElementById("us");
let shopSection = document.getElementById("shop");
let contactSection = document.getElementById("contact");


usButton.forEach(button => {
    button.addEventListener("click", (e) => {
        usSection.scrollIntoView({behavior: "smooth", block: "end"});
        e.preventDefault()
    })
});

shopButton.forEach(button => {
    button.addEventListener("click", (e) => {
        shopSection.scrollIntoView({behavior: "smooth", inline: "start"});
        e.preventDefault()
    })
});

contactButton.forEach(button => {
    button.addEventListener("click", (e) => {
        contactSection.scrollIntoView({behavior: "smooth", inline: "start"});
        e.preventDefault()
    })
});

usTextButton.forEach(button => {
    button.addEventListener("click", (e) => {
        contactSection.scrollIntoView({behavior: "smooth", inline: "start"});
        e.preventDefault()
    })
});