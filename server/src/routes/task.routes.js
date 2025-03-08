const router = require('express').Router();
const TaskController = require('../controllers/Task.controller');

router.get('/', TaskController.getAll);
router.get('/getAllByUser/:userId', TaskController.getAllByUser);
router.get('/get/:id', TaskController.getById);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

module.exports = router;
