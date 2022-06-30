class PhotographerCard {
    constructor(photographer) {
        this.photographer = photographer
    }

    createPhotographerCard(){
        const article = document.createElement('article');

        const PhotographerCard =`
        <img
            src="${this.photographer.portrait}"
            alt="portrait de ${this.photographer.portrait}"        
        />
        <h2>${this.photographer.name}</h2>
        `
        article.innerHTML = PhotographerCard

        return article
    }
}