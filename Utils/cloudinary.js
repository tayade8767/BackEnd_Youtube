const cloudinary = require('cloudinary').v2;

const fs = require('fs');




cloudinary.config({ 
    cloud_name: "dvosf7ajl", 
    api_key: 821293723233931, 
    api_secret: "MiDvYe6DnYAn5kO83XQRluD1NfI"            // Click 'View Credentials' below to copy your API secret
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // console.log(localFilePath);
        //  upload the file on cloudinary

        // const response = await cloudinary.uploader.upload(localFilePath , {
        //     resource_type: 'auto'
        // })

        const response = await cloudinary.uploader.upload(localFilePath,{ 
            resource_type: 'auto' }
        );

        // console.log(response)
        //  file has been uploaded successfully
        console.log("File has been uploaded successfully",response.url);

        //  if thw file is been uploaded successfully then delete the file form the local storage or from our server

        fs.unlinkSync(localFilePath);  // letter i we can delete the local file path from the local storage
        return response;

    } catch(error) {
        //   if the file has not been uploaded successfully then delete the file form the local storage or from the our server
        fs.unlinkSync(localFilePath);   // letter i we can delete the file form the local storage or from our server
        return null;
    }
}

module.exports = uploadOnCloudinary;
















// (async function() {

//     // Configuration
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();