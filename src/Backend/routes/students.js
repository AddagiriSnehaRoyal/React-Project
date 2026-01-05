const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const multer = require('multer');
const path = require('path');

// POST /api/students/upload-marksheets
router.post('/upload-marksheets', 
  upload.array('marksheets', 8),
  (req, res) => {
    try {
      // Check if files were uploaded
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No files uploaded'
        });
      }

      // Additional safety check (Multer already limits to 8)
      if (req.files.length > 8) {
        return res.status(400).json({
          success: false,
          error: 'Maximum 8 files allowed'
        });
      }

      // Prepare file details response
      const fileDetails = req.files.map(file => ({
        originalName: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        path: `/uploads/marksheets/${file.filename}`
      }));

      res.status(200).json({
        success: true,
        count: req.files.length,
        files: fileDetails
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Upload processing failed'
      });
    }
  }
);

module.exports = router;
