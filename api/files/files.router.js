const router = require("express").Router()
const cloudinary = require("../../config/cloudinary-config")
const base64 = require('node-base64-image')

router.post("/uploadUserImageProfile", async (req, res) => {
   
    const { image } = req.body;
    
    const decodedImage = base64.decode(image)

    return res.json({
        success: 0,
        message: decodedImage,
    });


    // try {
    //     if(image){
    //       const uploadRes =  await cloudinary.uploader.upload(image, {
    //             upload_preset: "univtraze_app"
    //         })
          
    //         if(uploadRes){
    //             return res.json({
    //                 success: 1,
    //                 message: "Image added successfully",
    //                 data: uploadRes
    //             });
    //         }

    //         return res.json({
    //             success: 0,
    //             message: "Failed uploading image to cloudinary",
    //             data: uploadRes
    //         });

    //     }

    // } catch (error) {
    //     return res.json({
    //         success: 0,
    //         message: "Failed uploading image to cloudinary : " + error,
    //     });
    // }
})

module.exports = router;