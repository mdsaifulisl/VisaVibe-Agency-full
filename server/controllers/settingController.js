const Setting = require('../models/Setting_modelsOne');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// ১. সেটিংস ডাটা গেট করা
exports.getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();

        if (!settings) {
            settings = await Setting.create({
                siteName: "Travel Admin",
                siteEmail: "info@travelagency.com"
            });
        }

        // লোগোর ফুল URL তৈরি করা
        let settingsData = settings.toJSON();
        if (settingsData.siteLogo) {
            settingsData.siteLogo = `${BASE_URL}${settingsData.siteLogo}`;
        }

        res.status(200).json({ success: true, data: settingsData });
    } catch (error) { 
        res.status(500).json({ 
            success: false,
            message: "Settings আনতে সমস্যা হয়েছে", 
            error: error.message 
        });
    }
};

// ২. সেটিংস এবং লোগো আপডেট করা
exports.updateSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();

        const {
            siteName, footerText, maintenanceMode, siteEmail,
            phone, address, facebook, instagram, linkedin,
            whatsapp, metaTitle, metaDescription
        } = req.body;

        const updateData = {
            siteName,
            footerText,
            maintenanceMode: maintenanceMode === 'true' || maintenanceMode === true,
            siteEmail,
            phone,
            address,
            facebook,
            instagram,
            linkedin,
            whatsapp,
            metaTitle,
            metaDescription
        };

        // নতুন ফাইল আপলোড হলে
        if (req.file) {
            const folder = req.uploadFolder || "Site_Settings";
            
            // [Optional] আগের লোগো ফাইলটি সার্ভার থেকে ডিলিট করা
            if (settings && settings.siteLogo) {
                const oldPath = path.join(__dirname, '..', settings.siteLogo);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            updateData.siteLogo = `/uploads/${folder}/${req.file.filename}`;
        }

        if (settings) {
            await settings.update(updateData);
            
            // রিটার্ন করার সময় ফুল URL পাঠানো
            let updatedResult = settings.toJSON();
            if (updatedResult.siteLogo) {
                updatedResult.siteLogo = `${BASE_URL}${updatedResult.siteLogo}`;
            }

            res.status(200).json({ 
                success: true,
                message: "সব সেটিংস সাকসেসফুলি আপডেট হয়েছে", 
                data: updatedResult 
            });
        } else {
            const newSettings = await Setting.create(updateData);
            res.status(201).json({ 
                success: true,
                message: "সেটিংস তৈরি এবং সেভ হয়েছে", 
                data: newSettings 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "সেটিংস আপডেট করতে ব্যর্থ হয়েছে", 
            error: error.message 
        });
    }
};