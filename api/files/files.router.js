const router = require("express").Router()
const cloudinary = require("../../config/cloudinary-config")
const multer = require('multer')
const streamifier = require('streamifier')
const fileUpload = multer()
const path = require('path');
const fs = require("fs");

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

async function uploadToCloudinary(locaFilePath) {
  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder

  var mainFolderName = "univtraze_app";
  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary
  var filePathOnCloudinary = 
      mainFolderName + "/" + locaFilePath;

  return cloudinary.uploader
      .upload(locaFilePath, { public_id: filePathOnCloudinary })
      .then((result) => {
          // Image has been successfully uploaded on
          // cloudinary So we dont need local image 
          // file anymore
          // Remove file from local uploads folder
          fs.unlinkSync(locaFilePath);

          return {
              message: "Success",
              url: result.url,
          };
      })
      .catch((error) => {
          // Remove file from local uploads folder
          fs.unlinkSync(locaFilePath);
          return { message: "Fail" };
      });
}

router.post("/uploadUserImageProfile", upload.single("image"), async (req, res, next) => {
      // req.file is the `profile-file` file
      // req.body will hold the text fields,
      // if there were any

      // req.file.path will have path of image
      // stored in uploads folder
      var locaFilePath = req.file.path;

      // Upload the local image to Cloudinary 
      // and get image url as response
      var result = await uploadToCloudinary(locaFilePath);

      return res.json({
        success: 1,
        results: result
      })
  }
);





module.exports = router;