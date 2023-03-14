const router = require('express').Router();

const googleSignup = require('../api/googleSignup');

router.use('/api', googleSignup)


module.exports = router;