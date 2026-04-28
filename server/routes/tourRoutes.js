const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const upload = require('../middleware/uploadMiddleware');

// ইমেজ ফোল্ডারের নাম সেট করার জন্য একটি ছোট মিডলওয়্যার
const setTourFolder = (req, res, next) => {
    req.uploadFolder = 'Tour_Image'; 
    next();
};

// ১. সব ট্যুর পাওয়ার জন্য (Public)
router.get('/', tourController.getAllTours);

// ২. একটি নির্দিষ্ট ট্যুর আইডি দিয়ে দেখার জন্য (Public)
router.get('/:id', tourController.getTourById);

// ৩. নতুন ট্যুর যোগ করার জন্য (ইমেজসহ)
// এখানে setTourFolder কল করা হয়েছে যাতে ইমেজ সঠিক ফোল্ডারে যায়
router.post('/', setTourFolder, upload.array('images', 10), tourController.createTour);

// ৪. ট্যুর আপডেট করার জন্য
router.put('/:id', setTourFolder, upload.array('images', 10), tourController.updateTour);

//
router.delete('/:id', tourController.deleteTour);
 
module.exports = router; 