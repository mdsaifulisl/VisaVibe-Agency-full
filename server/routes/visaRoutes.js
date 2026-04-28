const express = require('express');
const router = express.Router();
const visaController = require('../controllers/visaController');
const upload = require('../middleware/uploadMiddleware');

// ইমেজ ফোল্ডারের নাম সেট করার জন্য একটি ছোট মিডলওয়্যার
const setVisaFolder = (req, res, next) => {
    req.uploadFolder = 'Visa_Image'; 
    next();
};
 
// ১. সব ভিসা পাওয়ার জন্য (Public)
router.get('/', visaController.getAllVisas);

// ২. একটি নির্দিষ্ট ভিসা আইডি দিয়ে দেখার জন্য (Public)
router.get('/:id', visaController.getVisaById);

// ৩. নতুন ভিসা যোগ করার জন্য (ইমেজসহ)
// এখানে setVisaFolder কল করা হয়েছে যাতে ইমেজ সঠিক ফোল্ডারে যায়
router.post('/', setVisaFolder, upload.array('images', 10), visaController.createVisa);

// ৪. ভিসা আপডেট করার জন্য
router.put('/:id', setVisaFolder, upload.array('images', 10), visaController.updateVisa);

// ৫. ভিসা ডিলিট করার জন্য
router.delete('/:id', visaController.deleteVisa);

module.exports = router;