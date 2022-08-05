class MediasFactory{
    constructor(data) {
        if (data.hasOwnProperty('image')) {
            return new Image(data)
            
        } else if (data.hasOwnProperty('video')) {
            return new Video(data)
        }
        else {
            console.log("format non reconnu")
        }
    }
}