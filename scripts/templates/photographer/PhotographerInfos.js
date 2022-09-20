class PhotographerInfos {
    constructor(photographer) {
        this.photographer = photographer
    }

    init() {// attribut les information correspondantes
        // Header
        const title = document.querySelector("h1")
        const location = document.querySelector("h2")
        const tagline = document.querySelector(".tagline")
        let photographerImage = document.getElementById("photographer-image")
        const image =  `<img src="${this.photographer.portrait}" alt="${this.photographer.name}" />`

        title.textContent = this.photographer._name
        location.textContent = `${this.photographer._city},${this.photographer.country} `
        tagline.textContent = this.photographer._tagline
        photographerImage.innerHTML = image

        //Tarif
        const price = document.getElementById("price")
        price.textContent = `${this.photographer.price}€ / jour`
    }
}