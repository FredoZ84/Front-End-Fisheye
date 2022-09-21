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

            toInsert = `<img src="${this.media.source}"
                             alt="${this.media.title}"
                             class="media-type"
                             data-id="${this.media.id}"
                             data-folder="${this.media.folder}" 
                             data-file="${this.media.image}" /> `
        } else if(this.media.hasOwnProperty('_video') || this.media.hasOwnProperty('video')) {

            toInsert = `<video  src="${this.media.source}" 
                                class="media-type"
                                data-id="${this.media.id}"
                                data-folder="${this.media.folder}" 
                                data-file="${this.media.video}"
                                title="video">
                        </video>`
        } else {
            console.error("format non reconnu")
            console.log(this.media)
        }

        mediaComposition = `
            <a href="#" class="media-frame disabled"  aria-label="Lilac breasted roller, closeup view">
                ${toInsert}
                <div class="media-description">                
                    <span class="media-title">
                        ${this.media.title}
                    </span>
                    <span class="likes-area">
                        <span class="likes-number">${this.media.likes}</span>
                        <i class="fa-solid fa-heart" aria-label="likes"></i>
                    </span>                
                </div>
            </a>`
            

        mediaCard.innerHTML = mediaComposition

        return mediaCard
    }
}