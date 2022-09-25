class SorterForm {
    constructor() {
        
        this.sortBy = document.getElementById("sort_by")
        this.buttons = document.querySelectorAll("#sort_by button")
        this.photographerMedia = document.querySelector(".photographer-media")
        this.previousAreaButton = document.querySelector(".contact_button")   
    }

    init() {  
        this.sortSelectorEvent()
       
        this.activeLightBox()              

        // Encart likes & tarifs; total des likes
        let likes = new Likes()
        likes.init()
    }

    // Leste des événements des Selecteurs de tri
    sortSelectorEvent() {
        /*
        const test = this.actionOnAllButtons("test_buttons")

        console.log(test)
        */
        this.sortBy.addEventListener("mouseover", () => {
            this.sortByDeveloppement()
        })

        this.sortBy.addEventListener("mouseleave", () => {
            this.sortByWrap()
        })

        // Retour sur le boutin contactez moi via shift + tab
        this.previousAreaButton.addEventListener("focus",() => {
            if (this.sortBy.classList.contains("development")) {
                this.sortByWrap()
            }            
        })

        for (let i = 0; i < this.buttons.length; i++) {

            // Action au click sur chaque bouton
            this.buttons[i].addEventListener("click", (e) => {
                this.sortChoice(e.target)
                e.stopPropagation()
            })            
            
            // Action au clavier
            this.buttons[i].addEventListener('focus', () => {
                this.sortByDeveloppement()              
                
                this.sortBy.addEventListener("keyup", (e) => {
                    
                    if (e.key == "Enter") {
                        this.sortChoice(e.target)
                        e.stopPropagation()
                    }
                })              
            })
        }
    }

    sortByDeveloppement() {
        this.sortBy.setAttribute("class","development")

        this.actionOnAllButtons("visible_state") 

        this.buttons[this.buttons.length -1].classList.add("no_border")

        if (this.sortBy.classList.contains("wrap")) {
            this.sortBy.removeAttribute("wrap")
        }
    }

    sortByWrap() {
        this.sortBy.removeAttribute("class","development")

        this.sortBy.setAttribute("class","wrap")

        this.actionOnAllButtons("unseen_state")
    }

    sortChoice(e) { 
        
        // supprime la classe du bouton de tri précédemment séléctionné
        this.actionOnAllButtons("remove_the_selected")

        // Affiche uniquement le bouton séléctionné
        if (e.classList.contains("visible")) {
            e.classList.add("the_selected")
        }

        this.buttons[this.buttons.length -1].classList.add("no_border")        

        this.sort(e)       

    }   

    
    actionOnAllButtons(action) { // Action sur tous les boutons
        let counter = 0
        
        for (let i = 0; i < this.buttons.length; i++) { 
            
            switch (action) {
                case "remove_the_selected":
                    this.buttons[i].classList.remove("the_selected")
                break;
                case "visible_state":
                    if (this.buttons[i].classList.contains("the_selected")) {
                        this.buttons[i].classList.add("visible")
                    } else {
                        this.buttons[i].setAttribute("class","visible")
                    } 
                break;
                case "unseen_state":
                    if (this.buttons[i].classList.contains("the_selected")) {
                        this.buttons[i].classList.remove("visible")
                    } else {
                        this.buttons[i].removeAttribute("class","visible")
                    }                  
                break;
                case "test_buttons":
                    counter++                   
                break;            
                default:
                    console.error("action non précisée")
                break;
            }            
        }

        return counter
    }

    sort(e) {
        const MediasData = this.recover().map(media => new MediasFactory(media))  
        
        this.photographerMedia.innerHTML = ""

        MediasData        
        .sort((a,b) => {

                switch (e.value) {
                    case "likes":
                        return a._likes - b._likes
                    break;
                    case "date":
                        return new Date(a._date) - new Date (b._date)
                    break;
                    case "title":
                        return a._title.localeCompare(b._title)
                    break;                
                    default:
                    break;
                }            
            }
        )
        .forEach(media => {
            
            const Template = new PhotographerMedias(media)                    
            this.photographerMedia.appendChild(Template.mediaCard())
        })
        
        this.activeLightBox()
        const firstMedia = document.querySelector(".photographer-media .media-card a")

        firstMedia.addEventListener("focus", () => {
            this.sortByWrap()
        })      
        

        // Encart likes & tarifs; total des likes
        let likes = new Likes()
        likes.init()    
    }

    recover() {// récupère les informations des Medias
        let MediasData = []
        const mediaCard = document.querySelectorAll(".media-card")
        const likesNumber = document.querySelectorAll(".likes-number")
        const mediaTitle = document.querySelectorAll(".media-title")
        const mediaType = document.querySelectorAll(".media-type")
        const params = (new URL(document.location)).searchParams;  

        // Associations des infos des media card
        for (let i = 0; i < likesNumber.length; i++) {

            let media = {}

            media.photographerId = Number(params.get("id"))
            media.likes = Number(likesNumber[i].textContent)
            media.title = mediaTitle[i].textContent.trim()
            media.date = mediaCard[i].dataset.date 
            media.id  = mediaType[i].dataset.id
            media.folder  = mediaType[i].dataset.folder            

            if (mediaType[i].nodeName == "IMG") {
                media.image = mediaType[i].dataset.file
            } else if (mediaType[i].nodeName == "VIDEO") {
                media.video = mediaType[i].dataset.file
            }           
            
            MediasData.push(media)
        }
        
        return MediasData
    }

    activeLightBox() {

        const list = document.querySelectorAll(".media-type")
        const MediasData = this.recover().map(media => new MediasFactory(media))
    
        let lightBox = new LightBox(MediasData) 
        
        
        list      
        .forEach(media => {
            media.addEventListener("click", (e) => {
                lightBox.show(e.currentTarget.dataset.id)
            })
            media.parentNode.addEventListener("focus", () => {
                document.querySelector(".photographer-media").addEventListener("keyup", (e) => {
                    
                    if (e.target.children[0] == media)  {
                        if (e.key == "Enter") {           
                            lightBox.show(e.target.children[0].dataset.id)                        
                        }
                    }                    
                })                
            })
        })
        
        
       
   
    }
}