const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// public route anyone can send message to admin 
router.post("/", contactController.createContact);

// admin route (admin can view or delete messages)
router.get("/", contactController.getAllContacts);
router.put("/:id", contactController.updateStatus);
router.delete("/:id", contactController.deleteContact);

module.exports = router;