const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');


router.use('/get/calculate', require('./get/calculate'));
// router.use('/get/skills/', auth.verifyUID, require('./get/skills'))
// router.use('/get/extras/', auth.verifyUID, require('./get/extras'))
// router.use('/get/resume/', auth.verifyUID, require('./get/resume'))
// router.use('/get/services/', auth.verifyUID, require('./get/services'))
// router.use('/get/uploads', require('./get/uploads'));
// router.use('/get/projects', auth.verifyUID, require('./get/projects'))


router.get('/', async(_, res)=>{

    return res.status(200).send('Welcome to Server Public API page');
})

module.exports = router;