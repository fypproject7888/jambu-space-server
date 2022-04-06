const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const asyncMiddleware = require("../../../middlewares/async");
const imagesUploader = require("../../../helpers/imagesUploader");
const validateId = require("../../../middlewares/validateId");
const isEmpty = require("../../../helpers/isEmpty");

const Job = require("../../../models/Job");
const Review = require("../../../models/Review");
const Notification = require("../../../models/Notification");
const Customer = require("../../../models/Customer");
const Seller = require("../../../models/Seller");
const { validateCustomer } = require("../../../models/Customer");
const { validateSeller } = require("../../../models/Seller");

const customerImageUrl = "/media/images/customer/";
const sellerImageUrl = "/media/images/seller/";

function validateCustomerImageFile(file) {
  if (!file.image) return "Customer Image is required!";
  return null;
}

function validateSellerImageFile(file) {
  if (!file.image) return "Seller Image is required!";
  return null;
}

const uploadCustomerImageMiddleware = imagesUploader(
  validateCustomer,
  "/customer"
).fields([{ name: "image", maxCount: 1 }]);

const uploadSellerImageMiddleware = imagesUploader(
  validateSeller,
  "/seller"
).fields([{ name: "image", maxCount: 1 }]);

router.post(
  "/login",
  asyncMiddleware(async (req, res) => {
    const isCustomer = req.body.type === "customer";

    if (isCustomer) {
      const customer = await Customer.findOne({ email: req.body.email });
      if (!customer)
        return res.status(400).json({ message: "Invalid Email or Password!" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        customer.password
      );

      if (!validPassword)
        return res.status(400).json({ message: "Invalid Email or Password!" });

      res.json(customer);
    } else {
      const seller = await Seller.findOne({ email: req.body.email });
      if (!seller)
        return res.status(400).json({ message: "Invalid Email or Password!" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        seller.password
      );

      if (!validPassword)
        return res.status(400).json({ message: "Invalid Email or Password!" });

      res.json(seller);
    }
  })
);

router.get(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const userID = req.params.id;
    const customer = await Customer.findById(userID);
    const seller = await Seller.findById(userID);
    res.json(customer || seller || {});
  })
);

router.get(
  "/:id/reviews",
  validateId,
  asyncMiddleware(async (req, res) => {
    const userID = req.params.id;
    const response = await Review.find({ userID: userID });
    res.json(response);
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

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const isCustomer = req.body.type === "customer";
    if (isCustomer) {
      uploadCustomerImageMiddleware(req, res, async err => {
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

        const error = validateCustomerImageFile(req.files);
        if (error) return res.status(400).json({ message: error });

        const customer = new Customer(payload);
        await customer.save();

        const notification = new Notification(notificationPayload);
        await notification.save();

        res.json({ message: "Customer Added Successfully!" });
      });
    } else {
      uploadSellerImageMiddleware(req, res, async err => {
        if (err)
          return err.code === "LIMIT_FILE_SIZE"
            ? res
                .status(400)
                .json({ message: "File too large. Must be less than 200 KB" })
            : res.status(400).json({ message: err.message });

        if (isEmpty(req.files)) {
          const { error } = validateSeller(req.body);
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
          const sellerImage = {
            path: req.files.image[0].path,
            url: sellerImageUrl + req.files.image[0].filename,
            filename: req.files.image[0].originalname,
          };
          payload.image = sellerImage;
        }

        const notificationPayload = {
          description: `New Seller (${payload.username}) joined`,
          image: payload.image,
        };

        const error = validateSellerImageFile(req.files);
        if (error) return res.status(400).json({ message: error });

        const seller = new Seller(payload);
        await seller.save();

        const notification = new Notification(notificationPayload);
        await notification.save();

        res.json({ message: "Seller Added Successfully!" });
      });
    }
  })
);

router.put(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const userID = req.params.id;
    const isCustomer = req.body.type === "customer";
    if (isCustomer) {
      const payload = {
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        phone: req.body.phone,
        company: req.body.company,
        rating: req.body.rating,
        jobs: req.body.jobs,
        image: req.body.image,
      };

      await Customer.findByIdAndUpdate(userID, payload);
      res.json({ message: "Profile Updated Successfully!" });
    } else {
      const payload = {
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        phone: req.body.phone,
        company: req.body.company,
        rating: req.body.rating,
        jobs: req.body.jobs,
        image: req.body.image,
      };

      await Seller.findByIdAndUpdate(userID, payload);
      res.json({ image: "Profile Updated Successfully!" });
    }
  })
);

router.put(
  "/picture/:id",
  asyncMiddleware(async (req, res) => {
    const userID = req.params.id;
    const isCustomer = req.body.type === "customer";
    if (isCustomer) {
      uploadCustomerImageMiddleware(req, res, async err => {
        if (err)
          return err.code === "LIMIT_FILE_SIZE"
            ? res
                .status(400)
                .json({ message: "File too large. Must be less than 200 KB" })
            : res.status(400).json({ message: err.message });

        const customerImage = {
          path: req.files.image[0].path,
          url: customerImageUrl + req.files.image[0].filename,
          filename: req.files.image[0].originalname,
        };

        await Customer.findByIdAndUpdate(userID, {
          $set: { image: customerImage },
        });
        res.json({ image: customerImage });
      });
    } else {
      uploadSellerImageMiddleware(req, res, async err => {
        if (err)
          return err.code === "LIMIT_FILE_SIZE"
            ? res
                .status(400)
                .json({ message: "File too large. Must be less than 200 KB" })
            : res.status(400).json({ message: err.message });

        const customerImage = {
          path: req.files.image[0].path,
          url: sellerImageUrl + req.files.image[0].filename,
          filename: req.files.image[0].originalname,
        };

        await Seller.findByIdAndUpdate(userID, {
          $set: { image: customerImage },
        });
        res.json({ image: customerImage });
      });
    }
  })
);

module.exports = router;
