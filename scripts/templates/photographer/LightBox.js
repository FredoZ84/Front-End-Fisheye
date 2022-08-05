class LightBox {
    constructor(listElement) {
        this.currentElement = null
        this.listElement = listElement
        this.manageEvent();

    }

    show(id) {
        this.currentElement = this.getElementById(id);
        this.display()
    }  

    previous() {
        let index = this.listElement.findIndex(element => element.id == this.currentElement.id );
        if (index == 0) {
            this.currentElement = this.listElement[this.listElement.length-1];
        } else {
            this.currentElement = this.listElement[index-1];
        }
        
        this.display();
    }

    next() {
        let index = this.listElement.findIndex(element => element.id == this.currentElement.id );
        if (index == this.listElement.length - 1 ) {
            this.currentElement = this.listElement[0];
        } else {
            this.currentElement = this.listElement[index+1];
        }
        
        this.display();
    }

    manageEvent() {
        document.querySelector("#lightbox .next").addEventListener("click", () => {
            this.next();
        })

        document.querySelector("#lightbox .previous").addEventListener("click", () => {
            this.previous();
        })

        document.querySelector("#lightbox .close").addEventListener("click", () => {
            this.close();
        })

        document.querySelector("#lightbox").addEventListener("click", (e) => {
            if (e.target == e.curentTarget) {
                this.close();
            }            
        })

        document.addEventListener("keyup", (e) => {
    
            switch (e.key) {
                case "ArrowRight":
                    this.next();
                break;
                case "ArrowLeft":
                    this.previous();
                break;
                case "Escape":
                    this.close()
                break;
            
                default:
                    break;
            }
        })
    }

    getElementById(id) {
        return this.listElement.find(element => element.id == id)
    }


    display() {
        let mediaFrame = document.querySelector("#lightbox  .media-frame")
        let mediaDescription = document.querySelector("#lightbox  .media-description")
        
        mediaFrame.innerHTML ="";       
        

        if (this.currentElement.hasOwnProperty('_image')) {

             mediaFrame.innerHTML = `<img src="${this.currentElement.image}" alt="${this.currentElement.title}" />`  

        } else if(this.currentElement.hasOwnProperty('_video')) {

             mediaFrame.innerHTML = `<video src="${this.currentElement.video}" controls></video>`  

        } else {

            console.log("erreur de configuration")

        }

        mediaDescription.textContent = this.currentElement.title
        
        document.querySelector("#lightbox").classList.add("show") ;
    }

    close(){
        document.querySelector("#lightbox").classList.remove("show") ;
    }
}