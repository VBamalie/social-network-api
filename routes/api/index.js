const router = require('express').Router();
const thoughtsRoutes = require('./courseRoutes');
const userRoutes = require('./studentRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/user', userRoutes);

module.exports = router;
