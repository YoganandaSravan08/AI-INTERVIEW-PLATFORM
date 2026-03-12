const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { uploadResume } = require("../controllers/resumeController");

router.post("/upload-resume", upload.single("resume"), uploadResume);

module.exports = router;