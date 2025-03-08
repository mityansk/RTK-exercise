const CommentService = require('../services/Comment.service');
const formatResponse = require('../utils/formatResponse');

class CommentController {
  // Получить все комментарии к задаче
  static async getAllByTask(req, res) {
    try {
      const { taskId } = req.params;
      const comments = await CommentService.getAllByTask(taskId);
      if (comments.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, 'Комментариев для этой задачи нет!'));
      }
      res.status(200).json(formatResponse(200, 'Комментарии получены успешно', comments));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при получении комментариев', null, message));
    }
  }

  // Получить все комментарии автора
  static async getAllByAuthor(req, res) {
    try {
      const { authorId } = req.params;
      const comments = await CommentService.getAllByAuthor(authorId);
      if (comments.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, 'Комментариев для этого автора нет!'));
      }
      res
        .status(200)
        .json(formatResponse(200, 'Комментарии автора получены успешно', comments));
    } catch ({ message }) {
      res
        .status(500)
        .json(
          formatResponse(500, 'Ошибка при получении комментариев автора', null, message),
        );
    }
  }

  // Создать новый комментарий
  static async create(req, res) {
    const authorId = res.locals.user?.id; // предполагаем, что id пользователя в сессии - это authorId
    if (!authorId) {
      return res
        .status(403)
        .json(
          formatResponse(
            403,
            'Только авторизованные пользователи могут создавать комментарии!',
          ),
        );
    }
    try {
      const data = req.body;
      const newComment = await CommentService.create(data, authorId);
      if (!newComment) {
        return res
          .status(400)
          .json(
            formatResponse(400, 'Комментарий не создался', null, 'Ошибка при создании'),
          );
      }
      res.status(201).json(formatResponse(201, 'Комментарий успешно создан', newComment));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при создании комментария', null, message));
    }
  }

  // Обновить комментарий
  static async update(req, res) {
    const authorId = res.locals.user?.id; // предполагаем, что id пользователя в сессии - это authorId
    if (!authorId) {
      return res.status(403).json(formatResponse(403, 'Необходима авторизация!'));
    }
    try {
      const { id } = req.params;
      const data = req.body;
      const commentToUpdate = await CommentService.getById(id);
      if (!commentToUpdate) {
        return res.status(404).json(formatResponse(404, 'Комментарий не найден'));
      }
      if (commentToUpdate.authorId !== authorId) {
        return res
          .status(403)
          .json(
            formatResponse(
              403,
              'IDOR У вас нет прав на редактирование этого комментария',
            ),
          );
      }
      const updatedComment = await CommentService.update(id, data);
      if (!updatedComment) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Комментарий не обновился',
              null,
              'Ошибка при обновлении',
            ),
          );
      }
      res
        .status(200)
        .json(formatResponse(200, 'Комментарий успешно обновлен', updatedComment));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при обновлении комментария', null, message));
    }
  }

  // Удалить комментарий
  static async delete(req, res) {
    const authorId = res.locals.user?.id; // предполагаем, что id пользователя в сессии - это authorId
    if (!authorId) {
      return res.status(403).json(formatResponse(403, 'Необходима авторизация!'));
    }
    try {
      const { id } = req.params;
      const commentToDelete = await CommentService.getById(id);
      if (!commentToDelete) {
        return res.status(404).json(formatResponse(404, 'Комментарий не найден'));
      }
      if (commentToDelete.authorId !== authorId) {
        return res
          .status(403)
          .json(formatResponse(403, 'IDOR У вас нет прав на удаление этого комментария'));
      }
      const response = await CommentService.delete(id);
      if (!response) {
        return res
          .status(400)
          .json(
            formatResponse(400, 'Комментарий не удалился', null, 'Ошибка при удалении'),
          );
      }
      res.status(200).json(formatResponse(200, 'Комментарий успешно удален', null));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при удалении комментария', null, message));
    }
  }
}

module.exports = CommentController;
