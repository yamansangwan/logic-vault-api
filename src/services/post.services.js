const imagekit = require("imagekit")

const imgKit = new imagekit({
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URL_END_POINT
})

async function uploadFileBuffer(buffer,ogFile){

    try{
        const response = await imgKit.upload({
        file : buffer.toString("base64"),
        fileName : "ogFile"
        
        
        
    })  
    console.log("File uploaded");
    return response;
    } catch(error){
            console.log("Failed to upload file to IMAGEkit");
            return "Failed to upload file to IMAGEkit"
            
    }
 
}

module.exports = uploadFileBuffer