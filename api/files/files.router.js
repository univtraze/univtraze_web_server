const router = require("express").Router()
const cloudinary = require("../../config/cloudinary-config")
const multer = require('multer')
const streamifier = require('streamifier')
const fileUpload = multer()



router.post("/uploadUserImageProfile", fileUpload.single('image'),  async (req, res) => {

        let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              {
               folder: "univtraze_app_photos"
              },
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  res.json({
                      success: 0,
                      message: 'Uploading image failed, try again later'
                  })
                  reject(error);
                }
              },

            );

          streamifier.createReadStream(req.image.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let result = await streamUpload(req);
        res.status(200).json({
            success: 1,
            message: 'Image added successfully',
            data: result
        })
    }
    
    upload(req);

    // try {
    //     if(req){
    //       const uploadRes =  await cloudinary.uploader.upload(req, {
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