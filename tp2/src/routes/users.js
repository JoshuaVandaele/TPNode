const express = require("express");
const router = express.Router();
const { createUser, findUser, editUser, listUsers } = require("../controllers/users");
const winston = require("winston");

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

const logRequest = (req, res, next) => {
    logger.info(`${req.method} - /users${req.url}`);
    next();
};

router.use(logRequest);

router.get("/create", createUser);
router.get("/find", findUser);
router.get("/edit", editUser);
router.get("/list", listUsers);

module.exports = router;