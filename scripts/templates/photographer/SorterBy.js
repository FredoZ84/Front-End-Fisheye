class SorterForm {
    constructor(Medias) {
        this.Medias = Medias
        this.sortBy = document.getElementById("sort_by")
        this.photographerMedia = document.querySelector(".photographer-media")
    }

    init() {
        this.Medias
        .sort((a,b) => {return a._likes - b._likes})
        .forEach(media => {
            const Template = new PhotographerPage(media)                    
            this.photographerMedia.appendChild(Template.mediaCard())
        })

        let list = document.querySelectorAll(".photographer-media .media-card")

        let lightBox = new LightBox(this.Medias);

        list        
        .forEach(media => {
            media.addEventListener("click", (e) => {
                lightBox.show(e.currentTarget.dataset.id);
            })
        }) 

        this.sortBy.addEventListener('change', (e) => {
            this.photographerMedia.innerHTML = ""

            this.Medias
            .sort( (a,b) => {

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
                const Template = new PhotographerPage(media)                    
                this.photographerMedia.appendChild(Template.mediaCard())
            })


            list        
            .forEach(media => {
                media.addEventListener("click", (e) => {
                    lightBox.show(e.currentTarget.dataset.id);
                })
            })  
        })
    }

}