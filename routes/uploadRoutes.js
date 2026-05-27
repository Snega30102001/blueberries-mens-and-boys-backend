const path = require('path');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

// Create uploads folder if not exists
const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname).toLowerCase()
    );
  },
});

// File type validation
function checkFileType(file, cb) {

  const filetypes = /jpg|jpeg|png|webp|gif|svg|jfif|bmp/;

  // Check extension
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // Check mimetype
  const mimetype = file.mimetype.startsWith('image/');

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        'Only standard image files are allowed (jpg, jpeg, png, webp, gif, svg, jfif, bmp)!'
      )
    );
  }
}

// Multer upload setup
const upload = multer({
  storage,

  limits: {
    fileSize: 50 * 1024 * 1024, // 5MB
  },

  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Upload Route
router.post('/', (req, res) => {

  upload.single('image')(req, res, function (err) {

    // Multer specific errors
    if (err instanceof multer.MulterError) {

      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size too large. Maximum size is 5MB.',
        });
      }

      return res.status(400).json({
        success: false,
        message: `Multer upload error: ${err.message}`,
      });
    }

    // Other errors
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Upload failed',
      });
    }

    // No file uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid image file to upload.',
      });
    }

    // Relative image path
    const imagePath = `/uploads/${req.file.filename}`;

    // Full image URL
    const fullImageUrl =
      `${req.protocol}://${req.get('host')}${imagePath}`;

    // Success response
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',

      filename: req.file.filename,

      image: imagePath,

      imageUrl: fullImageUrl,

      file: {
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  });
});

module.exports = router;
