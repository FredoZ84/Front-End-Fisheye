class App {
    constructor() {
        this.photographersSection = document.querySelector(".photographer_section")
        this.photographersApi = new PhotographerApi("/data/photographers.json")
    }

    async main() {
        console.log(this.photographersApi)
        const photographersData = await this.photographersApi.getPhotographers()
        console.log(photographersData)

        photographersData
        .map(photographer => new Photographer(photographer))
        .forEach(photographer => {
            console.log(photographer)

            const Template = new PhotographerCard(photographer)
            this.photographersSection.appendChild(Template.createPhotographerCard())
        });
    }
}

const app = new App()
app.main()

