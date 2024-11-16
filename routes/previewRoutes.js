const express = require("express");
const router = express.Router();
const {
  getTemplatePreview,
  getFields,
  validateTemplatePreview,
} = require("../controllers/templateController");

router.get("/fields", getFields);
router.post("/template-preview", validateTemplatePreview, getTemplatePreview);

module.exports = router;
