const { Comment } = require('../db/models'); // Подключаем модель Comment

class CommentService {
  // Получить все комментарии к задаче
  static async getAllByTask(taskId) {
    try {
      return await Comment.findAll({ where: { taskId } });
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Ошибка при получении комментариев',
        error: error.message,
      };
    }
  }

  // Получить все комментарии автора
  static async getAllByAuthor(authorId) {
    try {
      return await Comment.findAll({ where: { authorId } });
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Ошибка при получении комментариев автора',
        error: error.message,
      };
    }
  }

  // Создать новый комментарий
  static async create(data) {
    try {
      const newComment = await Comment.create(data);
      return newComment;
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Не удалось создать комментарий',
        error: error.message,
      };
    }
  }

  // Обновить комментарий
  static async update(id, data) {
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return {
          statusCode: 404,
          message: 'Комментарий не найден',
          error: 'Комментарий с таким ID не существует',
        };
      }
      await comment.update(data);
      return comment;
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Ошибка при обновлении комментария',
        error: error.message,
      };
    }
  }

  // Удалить комментарий
  static async delete(id) {
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return {
          statusCode: 404,
          message: 'Комментарий не найден',
          error: 'Комментарий с таким ID не существует',
        };
      }
      await comment.destroy();
      return { message: 'Комментарий удален' };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Ошибка при удалении комментария',
        error: error.message,
      };
    }
  }

  // Получить комментарий по ID
  static async getById(id) {
    try {
      return await Comment.findByPk(id);
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Ошибка при получении комментария',
        error: error.message,
      };
    }
  }
}

module.exports = CommentService;