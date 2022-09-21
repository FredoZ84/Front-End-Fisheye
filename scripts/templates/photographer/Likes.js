class Likes{
    constructor(){
        this.area = document.querySelectorAll(".likes-area")
        this.frame = document.querySelectorAll(".media-frame")
        this.media = document.querySelectorAll(".media-type")
        this.likes = document.querySelectorAll(".likes-number")
        this.totalLikes = document.querySelector("#likes .number")
    }

    init() {
        const array =  Array.from(this.likes, e => {return Number(e.textContent)})
        let sum = 0;
        // Calcul du nombre total de likes
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }

        this.totalLikes.textContent = sum

        // Incrementation unique du like du media
        for (let i = 0; i < this.area.length; i++) {
            this.area[i].media = this.media[i] 
            
            this.area[i].addEventListener("click", () => {    

                this.likeMedia(this.area[i],this.likes[i],this.totalLikes)

            },{once:true}) 
            this.frame[i].addEventListener("focus", () => {
                document.addEventListener("keydown", (e)=> {
                    if (e.key == "+"){
                        this.likeMedia(this.area[i],this.likes[i],this.totalLikes)
                    }
                })
            })            
        }        
    }
    
    likeMedia(area,likes,totalLikes) {
        if (area.media.dataset.id !== sessionStorage.getItem(area.media.dataset.id)) {
            likes.textContent = Number(likes.textContent) + 1
            totalLikes.textContent = Number(totalLikes.textContent) + 1 
            // sauvegarde en cas de trie
            sessionStorage.setItem(area.media.dataset.id,area.media.dataset.id);
        }  else{
            console.log("déjà incrémenté")
        }
    }    
}