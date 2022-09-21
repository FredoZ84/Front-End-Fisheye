class LightBox {
    constructor(listElement) {
        this.currentElement = null
        this.listElement = listElement
        this.rightArrow = document.querySelector("#lightbox .next")
        this.leftArrow = document.querySelector("#lightbox .previous")
        this.xmark = document.querySelector("#lightbox .close")
        this.frame = document.querySelector("#lightbox")
        this.manageEvent()
        this.hyperlinkDisabled()
    }

    // Affichage du diaporama de la Lightbox
    show(id) {
        this.currentElement = this.getElementById(id);
        this.display()
    }  

    //  Passage à la diaposistive précédente
    previous() {
        let index = this.listElement.findIndex((element) => element.id == this.currentElement.id);

        if (index == 0) {
            this.currentElement = this.listElement[this.listElement.length-1];
        } else {
            this.currentElement = this.listElement[index-1];
        }
        
        this.display();
    }

    // Passage à la diaposistive suivante
    next() {
        let index = this.listElement.findIndex((element) => element.id == this.currentElement.id);

        if (index == this.listElement.length - 1 ) {
            this.currentElement = this.listElement[0];
        } else {
            this.currentElement = this.listElement[index+1];
        }
        
        this.display();
    }

    manageEvent() {
        this.rightArrow.addEventListener("click", () => {
            this.next();
        })

        this.leftArrow.addEventListener("click", () => {
            this.previous();
        })

        this.xmark.addEventListener("click", () => {
            this.close();
        })

        this.frame.addEventListener("click", (e) => {
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

             mediaFrame.innerHTML = `<img src="${this.currentElement.source}" alt="${this.currentElement.title}" />`  

        } else if(this.currentElement.hasOwnProperty('_video')) {

             mediaFrame.innerHTML = `<video src="${this.currentElement.source}" controls></video>`  

        } else {

            console.log("erreur de configuration")

        }

        mediaDescription.textContent = this.currentElement.title
        
        this.frame.classList.add("show") ;
    }

    close() {
        this.frame.classList.remove("show") ;
    }

    // desactive lien hypertexte
    hyperlinkDisabled() { 
        const groupOfLinks = document.getElementsByClassName("disabled")

		for (let i = 0; i < groupOfLinks.length; i++) {
			groupOfLinks[i].addEventListener("click", (e)  => {
                //console.log("lien hypertexte non autorisé")                
                e.preventDefault()            
			})
		}
    }
}