class App {
    constructor() {
        this.photographersSection = document.querySelector(".photographer_section")
        this.photographerHeader = document.querySelector(".photograph-header")
        this.photographerMedia = document.querySelector(".photographer-media")
        this.photographersApi = new Api("./data/photographers.json")
        this.mediasApi = new Api("./data/medias.json") 
    }

    async getPhotographer() {
      return  console.log("this")
    }

    getPage() {
        const path = window.location.pathname
        let page = null

        if (path.includes('.')) {// si path contient un  point ex:  index.html
            const arrayPath = path.split("/")
            const pageWithDot = arrayPath[arrayPath.length-1]
            const characterAfterDot = pageWithDot.split(".")[1]
            page = pageWithDot.slice(0 ,-1 *characterAfterDot.length-1) // page web sur laquelle on se trouve (index ou photographer)            
        } else {
            page = 'index'
        }        

        return page
    }

    async main() {
        const photographersData = await this.photographersApi.get()
        const mediasData = await this.mediasApi.get()
        const page = this.getPage()      
        const params = (new URL(document.location)).searchParams;
        let photograperId         

        // Attribution d'une proprité folder à chaque média
        for (let index = 0; index < photographersData.length; index++) {
            photographersData[index].medias = []   
            for (let i = 0; i< mediasData.length;i++){
                if (mediasData[i].photographerId === photographersData[index].id ) {
                    mediasData[i].folder = photographersData[index].name.split(" ")[0]
                }
            }            
        }        
        
        if (page == "index") {
            photographersData
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {                   
                // Affiche la liste des photographes sur la page d'accueil                  
                const Template = new PhotographerCard(photographer)
                this.photographersSection.appendChild(Template.createPhotographerCard())         
            })
        } else if (page == "photographer") {
            const photographersDataId = Array.from(photographersData, e => {return e.id})// Tableau des Id

            // Renvoi en cas d'erreur
            if (params.get('id')) {
                let id = Number(params.get('id'))
                if (isNaN(id) || !photographersDataId.includes(id))  {
                    window.location.href='error.html'
                } else {
                    photograperId = id
                }            
            } else  {
                window.location.href = 'index.html'
            }
            // insertion des informations du photographe
            photographersData
            .map(photographer => new Photographer(photographer))
            .filter(photographer => photographer._id === photograperId)
            .forEach(photographer => {                   
                                   
                const Template = new PhotographerInfos(photographer) 
                Template.init()   
            })

            mediasData
            .map(media => new MediasFactory(media))       
            .filter(media => media._photographerId === photograperId)
            .sort((a,b) => {return a._likes - b._likes}) // insertion par ordre des likes
            .forEach(media => { 

                const Template = new PhotographerMedias(media)                    
                this.photographerMedia.appendChild(Template.mediaCard())                
            })

            //Gestion du tri des media
            let sorter = new SorterForm()
            sorter.init()     
            
            const firstMedia = document.querySelector(".photographer-media .media-card")
            
            firstMedia.addEventListener("focus", () => {
                sorter.sortByWrap()
            })

            // Formulaire page de photographe
            const Form = new ContactForm()
            Form.init()            

        } else {
            window.location.href='error.html'
            console.log("page non trouvée")
        }        
    }
}

const app = new App()
app.main()