const multer = require('multer');
const path = require('path');
const MultiFiles = require('../models/MultiFiles');
const fs = require('fs');

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


exports.downloadFiles = async(req, res) => {
  const id = req.params.id;
  
  const file = await MultiFiles.findById({ _id: id });

  if (!file) {
    return res.status(404).json({ message: 'File not found' });
  }

  const fileName = file.file.split("files\\")[1];
  
  const filePath = path.join(__dirname, `../../src/assets/files/${fileName}`);
  
  try {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading the file:', err);
        return res.status(500).send('File not found.');
      }
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).send('An unexpected error occurred.');
  }
};

exports.getFiles = async(req, res) => {
    try {
        const files = await MultiFiles.find();
        res.status(200).json({ files });
    } catch (error) {
        console.error('Error getting files:', error);
        res.status(500).send('Server Error');
    }
}


exports.deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await MultiFiles.findById({ _id: id });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileName = file.file.split("files\\")[1];
    const filePath = path.join(__dirname, `../../src/assets/files/${fileName}`);
    console.log(filePath, file);

    // Check if the file exists before attempting deletion
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Error accessing file:', err);
        return res.status(500).json({ message: 'Error accessing file' });
      }

      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(500).json({ message: 'Error deleting file' });
        }
        console.log('File deleted successfully');
      });
    });

    await MultiFiles.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: 'File deleted' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
};