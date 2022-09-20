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
        <h3 class="photograper-city">${this.photographer.city}, ${this.photographer.country}</h3>
        <p class="photograper-tagline">${this.photographer.tagline}</p>
        <p class="photograper-price">${this.photographer.price}€/jour</p>
        
        `
        article.innerHTML = PhotographerCard

        return article
    }
}