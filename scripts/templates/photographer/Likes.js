class Likes{
    constructor(){
        this.area = document.querySelectorAll(".likes-area")
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

                if (this.area[i].media.dataset.id !== sessionStorage.getItem(this.area[i].media.dataset.id)) {
                    this.likes[i].textContent = Number(this.likes[i].textContent) + 1
                    this.totalLikes.textContent = Number(this.totalLikes.textContent) + 1 
                    // sauvegarde en cas de trie
                    sessionStorage.setItem(this.area[i].media.dataset.id,this.area[i].media.dataset.id);
                }  else{
                    console.log("déjà incrémenté")
                }

            },{once:true})         
            
        }        
    }
}