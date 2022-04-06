const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const sellerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: {
      path: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      filename: String,
    },
    required: true,
  },
  company: String,
  rating: Number,
  earnings: Number,
  jobs: Array,
});

const validateSeller = function (seller) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(255).required(),
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    country: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(11).max(13).required(),
    company: Joi.string(),
    type: Joi.string(),
    rating: Joi.number(),
    earnings: Joi.number(),
    jobs: Joi.array().items(Joi.string()).allow(null),
  });

  return schema.validate(seller);
};

module.exports = mongoose.model("sellers", sellerSchema);
module.exports.validateSeller = validateSeller;
