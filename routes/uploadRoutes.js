const path = require('path');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  // Support a much wider array of common, modern image types
  const filetypes = /jpg|jpeg|png|webp|gif|svg|jfif|bmp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only standard images are allowed (jpg, jpeg, png, webp, gif, svg, jfif, bmp)!'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer-specific error occurred
      return res.status(400).json({ message: `Multer upload error: ${err.message}` });
    } else if (err) {
      // Any other file type validation or system error occurred
      return res.status(400).json({ message: err.message || err });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please select a valid image file to upload.' });
    }

    // Convert file buffer to base64 Data URL
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const mimeType = req.file.mimetype;
    const dataURI = `data:${mimeType};base64,${b64}`;

    res.send({
      message: 'Image uploaded successfully',
      image: dataURI,
    });
  });
});

module.exports = router;
