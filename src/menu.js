import shoppingCart from "./assets/images/gouwuche.svg"
import collectItem  from "./assets/images/shoucang.svg"
import Americano    from "./assets/images/Americano.jpg"
import Cappuccino   from "./assets/images/Cappuccino.jpg"
import Latte        from "./assets/images/Latte.jpg"
import FlatWhite    from "./assets/images/Flat White.jpg"
import IcedLatte    from "./assets/images/Iced Latte.jpg"
import IcedCholat   from "./assets/images/Iced Cholat.jpg"
import IcedMocha    from "./assets/images/Iced Mocha.jpg"
import ColdBrew     from "./assets/images/Cold Brew.jpg"
import Crossaint    from "./assets/images/almond cross.jpg"
import "./assets/css/menu.css"

class Menu {
    constructor(content) {
        if (!(content instanceof Element && content.getAttribute('id') == "content")){
            throw new Error("Error: invalid 'content' element")
        }
        this.ContentContainer = content;
        this.itemList = {
            'Americano' : [Americano, '$7.00'],
            'Cappucino' : [Cappuccino,'$7.50'],
            'Latte' :     [Latte,     '$8.00'],
            'Flat White': [FlatWhite, '$7.50'],
            'Iced Latte': [IcedLatte, '$8.50'],
            'Iced Cholat':[IcedCholat,'$9.00'],
            'Iced Mocha': [IcedMocha, '$8.50'],
            'Cold Brew':  [ColdBrew,  '$7.50'],
            'Crossaint':  [Crossaint, '$6.50']
        }
    }

    #_addProductCard(productName, info, cardContainer){
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        const productContent = {
            'img':  ["img",info[0]],
            'div':  ["div",{
                className:'product-info',
                content:  {
                    'h4': ["h4",productName],
                    'p':  ["p",info[1]],
                    'div':  ["div",{
                        content:{
                            'img':  ["img", shoppingCart],
                            'img2': ["img",  collectItem]
                        }
                    }]
                }
            }]
        }

        this.#_resursiveCreateDom(productContent,productCard);
        cardContainer.appendChild(productCard);
    }

    #_resursiveCreateDom(currentObject, parentDom){
        for(const [key, value] of Object.entries(currentObject)){
            const element = document.createElement(value[0]);
            if(value[0] == 'div' || value[0] == 'ul'){
                if(Object.hasOwn(value[1],"className")){
                    element.classList.add(value[1]["className"]);
                }
                this.#_resursiveCreateDom(value[1]["content"], element);
            } else if (value[0] == 'img'){
                element.src = value[1];
            } else if(value[0] == 'li') {
                element.innerHTML = value[1];
            } else {
                element.textContent = value[1];
            }
            currentObject[key] = element;
            parentDom.appendChild(currentObject[key]);
        }
    }

    _constructFooter() {
        const footer = document.createElement("footer");
        footer.classList.add("footer");
        footer.textContent = "Copyright Wolfy Café © 2026";
        this.ContentContainer.appendChild(footer);
    }

    constructMenu(){
        const menuHeader = document.createElement("h2");
        menuHeader.textContent = "Menu";
        menuHeader.classList.add("menu-header");
        this.ContentContainer.appendChild(menuHeader);

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        this.ContentContainer.appendChild(cardContainer);

        for(const [product, info] of Object.entries(this.itemList)){
            this.#_addProductCard(product, info, cardContainer);
        }

        this._constructFooter();
    }
}

export default Menu;