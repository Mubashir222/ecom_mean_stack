const multer = require('multer');
const path = require('path');

// Define storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Adjust the path based on your project directory structure
      cb(null, path.join(__dirname, '../../src/assets/images/'));
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    }
  });

// Initialize multer with the defined storage
const upload = multer({ storage }).single("image");

exports.uploadImg = async(req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          console.error('Error during upload:', err);
          reject('Error uploading image.');
        } else {
          resolve();
        }
      });
    });
    if (req.file && req.file.filename){
      const imagePath = path.join('/assets/images/', req.file.filename);
  
      console.log(imagePath);
      
      res.status(200).json({ imagePath });
    }
  } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).send('Server Error');
  }
}