const app = require("./index");
const mongoose = require("mongoose");
const { logger } = require("./src/utils/logger");

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, (err) => {
      logger.info(err || `Listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
