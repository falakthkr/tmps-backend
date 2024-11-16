const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      label: "Username",
      placeholder: "Enter Username",
    },
    orderId: {
      type: String,
      required: true,
      label: "Order ID",
      placeholder: "Enter Order ID",
    },
    amount: {
      type: Number,
      required: true,
      label: "Amount (INR)",
      placeholder: "Enter Amount in INR",
    },
    address: {
      type: String,
      required: true,
      label: "Address",
      placeholder: "Enter Address",
    },
    trackLink: {
      type: String,
      required: true,
      label: "Tracking Link",
      placeholder: "Enter URL for Tracking Link",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Template", templateSchema);
