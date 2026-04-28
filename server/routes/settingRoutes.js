const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const upload = require("../middleware/uploadMiddleware");


const setSettingsFolder = (req, res, next) => {
    req.uploadFolder = 'Site_Settings'; 
    next();
}


router.get('/', settingController.getSettings);
router.put('/update', setSettingsFolder, upload.single('siteLogo'), settingController.updateSettings);

module.exports = router;