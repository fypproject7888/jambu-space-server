const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const asyncMiddleware = require("../../middlewares/async");
const imagesUploader = require("../../helpers/imagesUploader");
const validateId = require("../../middlewares/validateId");
const isEmpty = require("../../helpers/isEmpty");
const removeFile = require("../../helpers/removeFile");

const Job = require("../../models/Job");
const Notification = require("../../models/Notification");
const Customer = require("../../models/Customer");
const { validateCustomer } = require("../../models/Customer");

const customerImageUrl = "/media/images/customer/";

function validateSellerImageFile(file) {
  if (!file.image) return "Customer Image is required!";
  return null;
}

const uploadSellerImageMiddleware = imagesUploader(
  validateCustomer,
  "/customer"
).fields([{ name: "image", maxCount: 1 }]);

router.get(
  "/",
  asyncMiddleware(async (_, res) => {
    const response = await Customer.find();
    res.json(response);
  })
);

router.get(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const customerID = req.params.id;
    const response = await Customer.findById(customerID);
    res.json(response || {});
  })
);

router.get(
  "/:id/jobs",
  validateId,
  asyncMiddleware(async (req, res) => {
    const customerID = req.params.id;
    const response = await Job.find({ customerID: customerID });
    res.json(response);
  })
);

router.put(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const customerID = req.params.id;

    uploadSellerImageMiddleware(req, res, async err => {
      if (err)
        return err.code === "LIMIT_FILE_SIZE"
          ? res
              .status(400)
              .json({ message: "File too large. Must be less than 200 KB" })
          : res.status(400).json({ message: err.message });

      if (isEmpty(req.files)) {
        const { error } = validateCustomer(req.body);
        if (error)
          return res.status(400).json({ message: error.details[0].message });
      }

      const customerExist = await Customer.findById(customerID);

      if (customerExist) {
        const payload = {
          fullName: req.body.fullName,
          username: req.body.username,
          email: req.body.email,
          country: req.body.country,
          phone: req.body.phone,
          company: req.body.company,
          rating: req.body.rating,
          jobs: req.body.jobs,
        };

        if (req.files.image) {
          const customerImage = {
            path: req.files.image[0].path,
            url: customerImageUrl + req.files.image[0].filename,
            filename: req.files.image[0].originalname,
          };
          payload.image = customerImage;
        }

        const result = await Customer.findByIdAndUpdate(customerID, {
          $set: payload,
        });

        if (req.files.image && result.image) removeFile(result.image.path);

        res.json({ message: "Customer Updated Successfully!" });
      }
    });
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    uploadSellerImageMiddleware(req, res, async err => {
      if (err)
        return err.code === "LIMIT_FILE_SIZE"
          ? res
              .status(400)
              .json({ message: "File too large. Must be less than 200 KB" })
          : res.status(400).json({ message: err.message });

      if (isEmpty(req.files)) {
        const { error } = validateCustomer(req.body);
        if (error)
          return res.status(400).json({ message: error.details[0].message });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPasword = await bcrypt.hash(req.body.password, salt);

      const payload = {
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: hashedPasword,
        country: req.body.country,
        phone: req.body.phone,
        company: req.body.company,
        rating: req.body.rating,
        jobs: req.body.jobs,
      };

      if (req.files.image) {
        const customerImage = {
          path: req.files.image[0].path,
          url: customerImageUrl + req.files.image[0].filename,
          filename: req.files.image[0].originalname,
        };
        payload.image = customerImage;
      }

      const notificationPayload = {
        description: `New Customer (${payload.username}) joined`,
        image: payload.image,
      };

      const error = validateSellerImageFile(req.files);
      if (error) return res.status(400).json({ message: error });

      const customer = new Customer(payload);
      await customer.save();

      const notification = new Notification(notificationPayload);
      await notification.save();

      res.json({ message: "Customer Added Successfully!" });
    });
  })
);

router.delete(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const customerID = req.params.id;
    const result = await Customer.findByIdAndDelete(customerID);

    if (result.image) removeFile(result.image.path);

    res.json({ id: result._id } || {});
  })
);

module.exports = router;
