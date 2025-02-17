const express = require('express');
const { verifyJWT } = require('../middlewares/authMiddleware');
const { getPocs } = require('../controllers/user.controller');

const router = express.Router();

router.route("/pocs").get(verifyJWT, getPocs);

module.exports = router; 