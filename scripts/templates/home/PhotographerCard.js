class PhotographerCard {
    constructor(photographer) {
        this.photographer = photographer
    }

    createPhotographerCard(){
        const article = document.createElement('article');

        const PhotographerCard =`
        <a href="photographer.html?id=${this.photographer.id}">
            <img
                src="${this.photographer.portrait}"
                alt="${this.photographer.name}"        
            />
            <h2>${this.photographer.name}</h2>
        </a>
        <p class="photograper-city">${this.photographer.city}, ${this.photographer.country}</p>
        <p class="photograper-tagline">${this.photographer.tagline}</p>
        <p class="photograper-price">${this.photographer.price}/jour</p>
        
        `
        article.innerHTML = PhotographerCard

        return article
    }
}