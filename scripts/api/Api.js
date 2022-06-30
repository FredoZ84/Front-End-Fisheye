class Api {
    /**
     * 
     * @param {string} url
     */
    constructor(url){
        this.url = url;
    }

    async get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.data)
            .catch(err => console.log("une erreur se produit", err))
    }
}

class PhotographerApi extends Api {
    /**
     * 
     * @param {string} url
     */
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        return await this.get()
    }

}