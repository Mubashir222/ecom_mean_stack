import multer from 'multer';
import path from 'path';

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

// Initialize multer with the defined storage
const upload = multer({ storage }).single("image");

export default async function uploadImage(req, res) {
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
      const imagePath = path.join('/Imgs/', req.file.filename);
        
      res.status(200).json({ imagePath });
    }
  } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).send('Server Error');
  }
}
