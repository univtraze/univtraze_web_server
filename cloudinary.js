const cloudinary = require('Cloudinary');
const uploads = require('multer');

cloudinary.config({ 
  cloud_name: 'daf5a2n2t', 
  api_key: '677141335181791', 
  api_secret: 'S_AHiSugK75cshdLSDTacLR2kVA' 
});

exports.uploads = (file, folder) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        id: result.public_id
      })
    }, {
      resource_type: "auto",
      folder: folder
    })
  })
} 