class MediasFactory{
    constructor(data) {
        if (data.hasOwnProperty('image')) {
            console.log("Image")
            return new Image(data)
            
        } else if (data.hasOwnProperty('video')) {
            console.log("Video")
            return new Video(data)
        }
        else {
            console.log("format non reconnu")
        }
    }
}