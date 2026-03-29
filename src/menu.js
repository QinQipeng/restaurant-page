class Menu {
    constructor(content) {
        if (!(content instanceof Element && content.getAttribute('id') == "content")){
            throw new Error("Error: invalid 'content' element")
        }
        this.ContentContainer = content;
    }

    constructMenu(){
        console.log("construct menu");
    }
}

export default Menu;