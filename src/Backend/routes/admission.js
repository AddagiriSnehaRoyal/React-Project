const express = require('express');
const router = express.Router();

// New enquiry form endpoint
router.post('/enquiry', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    // Save to MongoDB or send email
    console.log('New enquiry:', { name, email, phone, message });
    res.json({ success: true, message: 'Enquiry received!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
