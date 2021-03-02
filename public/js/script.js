window.addEventListener("load", function(){
    let carro = document.querySelectorAll(".fa-shopping-cart");
    let body = document.querySelector("body");
    let card = document.querySelectorAll(".product-card");
    let productHeader = document.querySelectorAll(".product-card-header");


    for (i = 0; i < carro.length; i++) {
        carro[i].addEventListener("click", function(){
            this.style.color = "cyan";
        });
    };

    for (i = 0; i < card.length; i++) {
        card[i].addEventListener("mouseover", function(){
            body.style. backgroundColor = "black";
            body.style.transition = "all 1s";
            this.style.opacity = "100%"
        });
    }

    for (i = 0; i < card.length; i++) {
        card[i].addEventListener("mouseout", function(){
            body.style. backgroundColor = "#231f20";
            body.style.transition = "all 1s";
            this.style.opacity = "90%"
        });
    }
});