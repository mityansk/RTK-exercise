const router = require('express').Router();
const authRoutes = require('./auth.routes');
const taskRoutes = require('./task.routes');
const commentRoutes = require('./comment.routes')
const formatResponse = require('../utils/formatResponse');

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/comments', commentRoutes);


router.use('*', (req, res) => {
  res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports = router;
