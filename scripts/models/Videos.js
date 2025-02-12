class Video {
    constructor(data) {
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._video = data.video
        this._likes = data.likes
        this._date = data.date
        this._price = data.price
        this._folder = data.folder
    }

    get id() {
        return this._id
    }

    get photographerId() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

    get folder() {
        return this._folder
    }

    get video() {
        return this._video
    }
    
    get source() {
        return `./assets/images/media/${this._folder}/${this._video}`
    }
    
    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }
}