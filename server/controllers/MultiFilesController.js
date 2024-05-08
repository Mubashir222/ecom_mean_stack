const multer = require('multer');
const path = require('path');
const MultiFiles = require('../models/MultiFiles');

// Define storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Adjust the path based on your project directory structure
      cb(null, path.join(__dirname, '../../src/assets/files/'));
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    }
  });

// Initialize multer with the defined storage
const upload = multer({ storage }).single("file");

exports.uploadmultiFiles = async(req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          console.error('Error during upload:', err);
          reject('Error uploading file.');
        } else {
          resolve();
        }
      });
    });
    if (req.file && req.file.filename){
      const uploadedFile = path.join('/assets/files/', req.file.filename);
  
      console.log(uploadedFile);
      // Create a new MultiFiles document
      const multiFilesDocument = new MultiFiles({
        file: uploadedFile
      });

      // Save the document
      await multiFilesDocument.save();
      
      res.status(200).json({ uploadedFile });
    }
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).send('Server Error');
  }
}


exports.getFiles = async(req, res) => {
    try {
        const files = await MultiFiles.find();
        res.status(200).json({ files });
    } catch (error) {
        console.error('Error getting files:', error);
        res.status(500).send('Server Error');
    }
}
