class PhotographerMedias {
    constructor(media) {
        this.media = media
    }    

    mediaCard() {
        const mediaCard = document.createElement('div')
        mediaCard.classList.add("media-card")
        mediaCard.setAttribute("data-date",this.media.date)        

        let toInsert,mediaComposition
        
        if (this.media.hasOwnProperty('_image') || this.media.hasOwnProperty('image')) {
            toInsert = `<img src="${this.media.image}" alt=" à définir" data-id="${this.media.id}" />        `
        } else if(this.media.hasOwnProperty('_video') || this.media.hasOwnProperty('video')) {
            toInsert = `<video src="${this.media.video}" data-id="${this.media.id}" title="video"></video>`
        } else {
            console.error("format non reconnu")
            console.log(this.media)
        }

        mediaComposition = `
            <div class="media-frame">
            ${toInsert}
            </div>
            <div class="media-description">
                <h2>
                    <span class="media-title">
                        ${this.media.title}
                    </span>
                    <span class="likes-area">
                        <span class="likes-number">${this.media.likes}</span>
                        <i class="fa-solid fa-heart"></i>
                    </span>
                </h2>
            </div>`

        mediaCard.innerHTML = mediaComposition

        return mediaCard
    }
}