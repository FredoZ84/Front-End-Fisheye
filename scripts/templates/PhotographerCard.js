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
                alt="portrait de ${this.photographer.name}"        
            />
            <h2>${this.photographer.name}</h2>
            <p class="photograper_city">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="photograper_tagline">${this.photographer.tagline}</p>
            <p photograper_price>${this.photographer.price}/jour</p>
        </a>
        `
        article.innerHTML = PhotographerCard

        return article
    }
}