import shoppingCart from "./assets/images/gouwuche.svg"
import collectItem  from "./assets/images/shoucang.svg"
import Americano    from "./assets/images/Americano.jpg"
import Cappuccino   from "./assets/images/Cappuccino.jpg"
import Latte        from "./assets/images/Latte.jpg"
import FlatWhite    from "./assets/images/Flat White.jpg"
import logoReverse  from "./assets/images/wolfy-cafe reverse.svg"
import fakeRetail   from "./assets/images/wolfy-cafe-retail.png"
import googleMap    from "./assets/images/wolfyCafe-google-map.png"


class Home {
    constructor(content) {
        if (!(content instanceof Element && content.getAttribute('id') == "content")){
            throw new Error("Error: invalid 'content' element")
        }
        this.ContentContainer = content;
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

    _constructHero() {
        const heroContent = {
            'hero':     ['div'],
            'info':     ['div'],
            'title':    ['h1',"Start Your Day with Wolfy Café!"],
            'subtext':  ['p',"With a world champion level in fermentation and roasting techniques at the \
helm, our freshly brewed coffee is to elevate your day with the highest quality experience!"],
            'take-order':         ['button',"Take Order"]
        }

        Object.entries(heroContent).forEach(([key, value]) => {
            const element = document.createElement(value[0]);
            element.classList.add(key);
            
            if(!(key == "info" || key == "hero")){
                element.textContent = value[1];
            }
            heroContent[key] = element;
        })

        for(const [key, value] of Object.entries(heroContent)){
            if (key != "hero")
                heroContent[key == "info"? "hero" : "info"].appendChild(value)
        }

        this.ContentContainer.appendChild(heroContent["hero"]);
    }

    _constructRecommendation() {
        const recommContent = {
            'recommondations':     ['div'],
            'h2':                  ['h2',"Hot Sellers of the Season"],
            'card-container':      ['div'],
        }

        const hotSellers = {
            'Americano' : [Americano, '$7.00'],
            'Cappucino' : [Cappuccino,'$7.50'],
            'Latte' :     [Latte,     '$8.00'],
            'Flat White': [FlatWhite, '$7.50']
        }

        for(const [key, value] of Object.entries(recommContent)){
            const element = document.createElement(value[0]);
            if(key == "h2"){
                element.textContent = value[1];
            }else{
                element.classList.add(key);
            }
            recommContent[key] = element;

            if(key != "recommondations") {
                recommContent["recommondations"].appendChild(recommContent[key]);
            }
        }
        
        for(const [product, info] of Object.entries(hotSellers)){
            this.#_addProductCard(product, info, recommContent['card-container']);
        }

        content.appendChild(recommContent['recommondations']);        
    }

    _constructContact() {
        const contact = document.createElement("div");
        contact.classList.add("contact");

        const contactContent = {
            "div" : ["div",{
                className: "logo",
                content: {
                    "img":["img",logoReverse],
                    "h3" :["h3","WOLFY CAFÉ"]
                }
            }],
            "div2" : ["div",{
                className: "contact-info",
                content: {
                    "ul":["ul",{
                        content: {
                            "li":["li",'Location: <span class="attr">14A Cameron Road, <br>Tsim Sha Tsui, Kowloon, <br>Hong Kong</span>'],
                            "li2":["li",'Working Hours: <span class="attr">09:30~20:00</span>'],
                            "li3":["li",'Tel: <span class="attr">+852 21100226</span>'],
                            "li4":["li",'Email: <span class="attr">WolfyCafe@gmail.com</span>']
                        }
                    }],
                    "div":["div",{
                        className: "address-images",
                        content: {
                            "img":["img",fakeRetail],
                            "img2":["img",googleMap]
                        }
                    }]
                }
            }]
        }
        this.#_resursiveCreateDom(contactContent, contact);
        this.ContentContainer.appendChild(contact);
    }

    _constructFooter() {
        const footer = document.createElement("footer");
        footer.classList.add("footer");
        footer.textContent = "Copyright Wolfy Café © 2026";
        this.ContentContainer.appendChild(footer);
    }
    constructHome() {
        this._constructHero();
        this._constructRecommendation();
        this._constructContact();
        this._constructFooter();
    }

}

export default Home;
