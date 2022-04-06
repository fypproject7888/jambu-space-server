const mongoose = require("mongoose");
const logger = require("../helpers/logger");
const { MONGO_URI } = require("../config");

module.exports = function () {
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex");

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("> 👍 Connected to MongoDB..."))
    .catch((err) => logger.error(`Could not connect to MongoDB!!! \n ${err}`));
};
