class ContactForm {
    constructor(){
        this.modal = document.querySelector(".bground")
        this.buttonContact = document.querySelector(".contact_button")
        this.close = document.querySelector(".closeModal")
        this.elementsList = document.getElementById("elements_list")
        this.title = document.querySelector(".modal>header>h1")
    }

    formData(element,id,type,label) {
        // element à inserer soit input soit textarea
        let toInsert;
        // condition en fonction du paramètre  
        if (element === "input") {
            toInsert = `<input type="${type}" id="${id}" name="${id}" placeholder="${label}" />`
        } else {
            toInsert =`<textarea id="${id}" name="${id}" placeholder="${label}"></textarea>`
        }

        const data =`
            <!--${label}-->
            <div class="formData">
                    <label>${label}</label>
                    ${toInsert}
            </div>
        `      
        return data
    }

    init(){
        //displayModal
        this.buttonContact.addEventListener("click", () => {this.modal.style.display = "block"})  
        //closeModal
        this.close.addEventListener("click", () => {this.modal.style.display = "none"})

        document.addEventListener("keyup", (e) => {
    
            if (e.key == "Escape") {
                this.modal.style.display = "none"
            }
        })

        const titleContact = document.querySelector("#contact_modal h1")
        const photograperName = document.querySelector('h1')
       
        titleContact.innerHTML += `<br /> ${photograperName.textContent}`

        const datas = [
            this.formData("input","firstname","text","Prénom"),
            this.formData("input","lastname","text","Nom"),
            this.formData("input","email","email","Email"),
            this.formData("textarea","message",null,"Votre message")
        ]

        for (let i = 0;i<datas.length;i++) {
            this.elementsList.innerHTML += datas[i]
        }        
    }
}

