const router = require('express').Router();
const CommentController = require('../controllers/Comment.controller');

router.get('/:taskId', CommentController.getAllByTask);
router.get('/getAllByAuthor/:authorId', CommentController.getAllByAuthor);
router.post('/', CommentController.create);
router.put('/:id', CommentController.update);
router.delete('/:id', CommentController.delete);

module.exports = router;
