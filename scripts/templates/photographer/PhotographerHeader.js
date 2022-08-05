class PhotographerHeader {
    constructor(photographer) {
        this.photographer = photographer
    }

    header(){
        const title = document.querySelector("h1")
        const location = document.querySelector("h2")
        const tagline = document.querySelector(".tagline")
        let photographerImage = document.getElementById("photographer-image")
        const image =  `<img src="${this.photographer.portrait}" alt="${this.photographer._name}" />`

        title.textContent = this.photographer._name
        location.textContent = `${this.photographer._city},${this.photographer._country} `
        tagline.textContent = this.photographer._tagline
        photographerImage.innerHTML = image
    }
}