const ExpressServer = require("./server/expressServer");
const sequelize = require("./sequelize");
const config = require("../config");
const logger = require("./logger");
const User = require("../models/user")



module.exports = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ alter: true });
logger.info("User model were synchronized successfully.");
    const server = new ExpressServer();
    logger.info("Express Loaded");
    logger.info("DB loaded and connected");
    server.start();
    logger.info(`#######################################
      Server listening on port: ${config.port}
      #######################################
    `);
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};
