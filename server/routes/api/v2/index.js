const express = require('express');
const router = express.Router()
const auth = require('../../../middleware/auth');

router.use("/auth", require('./auth'));
router.use("/pricing", auth.verifyToken, require('./pricing').router)
router.use('/logs', auth.verifyToken, require('./history'))


// @desc    Server API Page
// @route   GET /api/v2

router.get("/", auth.verifyToken, (_, res) => {
    res.send(`Welcome to the server, you are at the Server API Page`);
})


module.exports = router