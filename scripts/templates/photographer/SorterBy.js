class SorterForm {
    constructor() {
        
        this.sortBy = document.getElementById("sort_by")
        this.photographerMedia = document.querySelector(".photographer-media")
    
    }

    init() {            

        this.activeLightBox()

        this.sortBy.addEventListener('change',(e) =>{this.sort(e)})

        // Encart likes & tarifs; total des likes
        let likes = new Likes()
        likes.init()
    }

    sort(e) {          
        
        const MediasData = this.recover()
        
        this.photographerMedia.innerHTML = ""

        MediasData
        .map(media => new MediasFactory(media))  
        .sort((a,b) => {

                switch (e.target.value) {
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

        // Encart likes & tarifs; total des likes
        let likes = new Likes()
        likes.init()
    
    }

    recover() {// récupère les informations des Medias
        let MediasData = []
        const mediaCard = document.querySelectorAll(".media-card")
        const likesNumber = document.querySelectorAll(".likes-number")
        const mediaTitle = document.querySelectorAll(".media-title")
        const params = (new URL(document.location)).searchParams;  

        // Associations des infos des media card
        for (let i = 0; i < likesNumber.length; i++) {
            let media = {}
            mediaCard[i].element = mediaCard[i].children[0].children[0] // image ou video

            media.photographerId = Number(params.get("id"))
            media.likes = Number(likesNumber[i].textContent)
            media.title = mediaTitle[i].textContent.trim()
            media.date = mediaCard[i].dataset.date 
            media.id  = mediaCard[i].children[0].children[0].dataset.id
            media.folder  = mediaCard[i].element.src.split("/")[6]
            

            if (mediaCard[i].element.nodeName == "IMG") {
                media.image = mediaCard[i].element.src.split("/")[7]
            } else if (mediaCard[i].element.nodeName == "VIDEO") {
                media.video = mediaCard[i].element.src.split("/")[7]
            }           
            
            MediasData.push(media)
        }

        return MediasData
    }

    activeLightBox() {

        const list = document.querySelectorAll(".media-frame>*")
        const MediasData = this.recover().map(media => new MediasFactory(media))

        let lightBox = new LightBox(MediasData);

        list        
        .forEach(media => {
            media.addEventListener("click", (e) => {
                lightBox.show(e.currentTarget.dataset.id)
            })
        }) 

        return list
    }

}