class PhotographerPage {
    constructor(media) {
        this.media = media
    }

    mediaCard() {
        const media = document.createElement('div');

        let mediaCard;
        
        if (this.media.hasOwnProperty('_image')) {
            mediaCard = `
        <div>
            <img src="${this.media.image}" alt=" à définir " />
        </div>
        `
        } else if(this.media.hasOwnProperty('_video')) {
            mediaCard = `
            <div>
                <video src="${this.media.video}" controls></video>
            </div>
            `
        }
        media.innerHTML = mediaCard

        return media
    }
}