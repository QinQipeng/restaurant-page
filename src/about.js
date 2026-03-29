class About {
    constructor(content) {
        if (!(content instanceof Element && content.getAttribute('id') == "content")){
            throw new Error("Error: invalid 'content' element")
        }
        this.ContentContainer = content;
    }

    constructAbout(){
        console.log("construct about");
    }
}

export default About;