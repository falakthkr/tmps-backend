const Template = require("../models/templateModel");
const { body, validationResult } = require("express-validator");

const validateTemplatePreview = [
  body("username")
    .isString()
    .withMessage("Username is required and must be a string"),
  body("orderId")
    .isString()
    .withMessage("Order ID is required and must be a string"),
  body("amount")
    .isNumeric()
    .withMessage("Amount is required and must be a number"),
  body("address")
    .isString()
    .withMessage("Address is required and must be a string"),
  body("trackLink").isURL().withMessage("Track link must be a valid URL"),
];

const getFields = (req, res) => {
  try {
    const schema = Template.schema.obj;
    res.json(schema);
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
};

const getTemplatePreview = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, orderId, amount, address, trackLink } = req.body;

  res.status(200).json({
    template: `Hello ${username}, your order ${orderId} is confirmed for ₹${amount}. We'll deliver it to ${address}. Track your order here: ${trackLink}`,
  });
};

module.exports = { getFields, validateTemplatePreview, getTemplatePreview };
