class ContactForm {
    constructor(/*photographer*/){
        //this._photographer = photographer
        this.modal = document.querySelector(".bground")
        this.buttonContact = document.querySelector(".contact_button")
        this.close = document.querySelector(".closeModal")
        this.elementsList = document.getElementById("elements_list")
    }

    formData(element,id,type,label) {
        // element à inserer soit input soit textarea
        let toInsert;
        // condition en fonction du paramètre  
        if (element === "input") {
            toInsert = `<input type="${type}" id="${id}" name="${id}" />`
        } else {
            toInsert =`<textarea id="${id}" name="${id}"></textarea>`
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

// Formulaire page de photographe
const Form = new ContactForm()
Form.init()