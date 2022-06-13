const router = require("express").Router()
const cloudinary = require("../../config/cloudinary-config")

router.post("/uploadUserImageProfile", async () => {
   
    const { image } = req.body;
    
    try {
        if(image){
          const uploadRes =  await cloudinary.uploader.upload(image, {
                upload_preset: "univtraze_app"
            })
          
            if(uploadRes){
                return res.json({
                    success: 1,
                    message: "Image added successfully",
                    data: uploadRes
                });
            }

            return res.json({
                success: 0,
                message: "Failed uploading image to cloudinary",
                data: uploadRes
            });

        }

    } catch (error) {
        return res.json({
            success: 0,
            message: "Failed uploading image to cloudinary : " + error,
        });
    }
})

module.exports = router;