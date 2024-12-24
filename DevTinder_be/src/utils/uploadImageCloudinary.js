const cloudinary = require('cloudinary').v2;

require('dotenv').config();

// Configuration
cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
});

const uploadImageCloudinary =async (photoURL) => {
    const buffer = photoURL?.buffer || Buffer.from(await photoURL.arrayBuffer())
    
    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({ folder : "DevTinder"},(error,uploadResult)=>{
            if (error) return reject(error); // Proper error handling
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadImage
}

module.exports={uploadImageCloudinary};