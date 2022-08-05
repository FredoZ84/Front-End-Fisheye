class App {
    constructor() {
        this.photographersSection = document.querySelector(".photographer_section")
        this.photographerHeader = document.querySelector(".photograph-header")
        this.photographersApi = new Api("/data/photographers.json")
        this.mediasApi = new Api("/data/medias.json") 
    }

    async getPhotographer() {
      return  console.log("this")
    }

    getPage() {
        const path = window.location.pathname;
        const characterAfterDot = path.split(".")[1]
        const page = path.slice(1 ,-1 *characterAfterDot.length-1) // page web sur laquelle on se trouve (index ou photographer)

        return page
    }

    async main() {
        const photographersData = await this.photographersApi.get()
        const mediasData = await this.mediasApi.get()
        const page = this.getPage()
        
        const params = (new URL(document.location)).searchParams;
        let photograperId;

        //
        if (params.get('id')) {
            photograperId = Number(params.get('id'))
        }

        //
        for (let index = 0; index < photographersData.length; index++) {
            for (let i = 0; i< mediasData.length;i++){
                if (mediasData[i].photographerId === photographersData[index].id ) {
                    mediasData[i].folder = photographersData[index].name.split(" ")[0]
                }
            }            
        }
        
        // Affiche la liste des photographes sur la page d'accueil
        if (page == "index") {
            photographersData
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {                   
                                   
                    const Template = new PhotographerCard(photographer)
                    this.photographersSection.appendChild(Template.createPhotographerCard())         
            })
        } else if (page == "photographer") {
            let Medias = []
            // insertion des informations du photographe
            photographersData
            .map(photographer => new Photographer(photographer))
            .filter(photographer => photographer._id === photograperId)
            .forEach(photographer => {                   
                                   
                const Template = new PhotographerHeader(photographer) 
                Template.header()   
            })

            mediasData
            .map(media => new MediasFactory(media))       
            .filter(media => media._photographerId === photograperId)
            .forEach(media => {            
        
                Medias.push(media)                         
            })
            
            let sorter = new SorterForm(Medias)
            sorter.init()

        } else {
            console.log("page non trouvée")
        }        
    }
}

const app = new App()
app.main()