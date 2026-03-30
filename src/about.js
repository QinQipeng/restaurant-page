import logoReverse  from "./assets/images/wolfy-cafe reverse.svg"
import fakeRetail   from "./assets/images/wolfy-cafe-retail.png"
import googleMap    from "./assets/images/wolfyCafe-google-map.png"
import portrait     from "./assets/images/me.jpg"

class About {
    constructor(content) {
        if (!(content instanceof Element && content.getAttribute('id') == "content")){
            throw new Error("Error: invalid 'content' element")
        }
        this.ContentContainer = content;
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

    constructAbout(){
        const intro = document.createElement("div");
        intro.classList.add("intro");

        const img = document.createElement("img");
        img.src = portrait;
        intro.appendChild(img);

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "<strong>Wolfy Café</strong> was founded by a passionate coffee enthusiast who believed that great coffee should feel both <strong>crafted and personal</strong>. Inspired by the calm focus of a wolf and the warmth of a neighborhood café, the owner set out to create a space where every cup tells a story. \
<br><br>At Wolfy Café, we are dedicated to <strong>high-quality, hand-crafted coffee</strong> — from carefully selected beans to precise brewing techniques. Every drink is made with attention to detail, balancing flavor, aroma, and texture. Alongside our coffee, we offer a selection of <strong>freshly prepared snacks and pastries</strong>, designed to complement each cup. \
<br><br>More than just a café, Wolfy Café is a place to slow down, enjoy the process, and experience coffee the way it was meant to be — <strong>intentional, refined, and made by hand</strong>. 🐺☕"

        intro.appendChild(paragraph);
        this.ContentContainer.appendChild(intro);

        this._constructContact();
        this._constructFooter();
    }
}

export default About;