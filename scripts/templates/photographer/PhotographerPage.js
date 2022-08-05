class PhotographerPage {
    constructor(media) {
        this.media = media
    }    

    mediaCard() {
        const mediaCard = document.createElement('div')
        mediaCard.classList.add("media-card")
        mediaCard.setAttribute("data-id",this.media.id)

        let toInsert,mediaComposition;
        
        if (this.media.hasOwnProperty('_image')) {
            toInsert = `<img src="${this.media.image}" alt=" à définir " />        `
        } else if(this.media.hasOwnProperty('_video')) {
            toInsert = `<video src="${this.media.video}" title="video"></video>`
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
                        ${this.media.likes} <i class="fa-solid fa-heart"></i>
                    </span>
                </h2>
            </div>`

        mediaCard.innerHTML = mediaComposition

        return mediaCard
    }
}