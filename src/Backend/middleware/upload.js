const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const uploadDir = path.join(__dirname, '..', 'uploads', 'marksheets');

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return cb(err);
      }
      const ext = path.extname(file.originalname);
      const filename = `marksheet-${buf.toString('hex')}${ext}`;
      cb(null, filename);
    });
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPG, and PNG files are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
    files: 8 // Max 8 files
  },
  fileFilter
});

module.exports = { upload, uploadDir };
