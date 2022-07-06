class App {
    constructor() {
        this.photographersSection = document.querySelector(".photographer_section")
        this.photographersApi = new Api("/data/photographers.json")
        this.mediasApi = new Api("/data/medias.json") 
    }

    async getPhotographer() {
      return  console.log("this")
    }

    async main() {
        const photographersData = await this.photographersApi.get()
        const mediasData = await this.mediasApi.get()
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
        if (this.photographersSection) {
            photographersData
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {                   
                                   
                    const Template = new PhotographerCard(photographer)
                    this.photographersSection.appendChild(Template.createPhotographerCard())         
            })
        }

        mediasData
        .map(media => new MediasFactory(media))       
        .filter(media => media._photographerId === photograperId)
        .forEach(media => {
            console.log(media._image)
                const Template = new PhotographerPage(media)                    
                document.querySelector(".photographer-media").appendChild(Template.mediaCard())
            
        })
    }
}

const app = new App()
app.main()