class Media {
    constructor(data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.image = data.image
        this.like = data.like
        this.date = data.date
        this.price = data.price
    }

    get id() {
        return this.id
    }

    get photographerId() {
        return this.photographerId
    }

    get title() {
        return this.title
    }

    get image() {
        return `/assets/images/photographers/${this.image}`
    }
}