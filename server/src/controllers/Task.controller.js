const TaskService = require('../services/Task.service');
const formatResponse = require('../utils/formatResponse');

class TaskController {
  // Получить все задачи
  static async getAll(req, res) {
    try {
      const tasks = await TaskService.getAll();
      if (tasks.length === 0) {
        return res.status(200).json(formatResponse(200, 'Задач для отображения нет!'));
      }
      res.status(200).json(formatResponse(200, 'Задачи успешно получены', tasks));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при получении задач', null, message));
    }
  }

  // Получить все задачи пользователя
  static async getAllByUser(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res
          .status(400)
          .json(formatResponse(400, 'Не указан userId', null, 'Missing userId'));
      }
      const tasks = await TaskService.getAllByUser(userId);
      if (tasks.length === 0) {
        return res.status(200).json(formatResponse(200, 'Задач для пользователя нет!'));
      }
      res
        .status(200)
        .json(formatResponse(200, 'Задачи пользователя успешно получены', tasks));
    } catch ({ message }) {
      res
        .status(500)
        .json(
          formatResponse(500, 'Ошибка при получении задач пользователя', null, message),
        );
    }
  }

  // Получить задачу по ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.getById(id);
      if (!task) {
        return res
          .status(404)
          .json(formatResponse(404, 'Задача не найдена', null, 'Задача не найдена'));
      }
      res.status(200).json(formatResponse(200, 'Задача успешно получена', task));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при получении задачи', null, message));
    }
  }

  // Создать новую задачу
  static async create(req, res) {
    const id = res.locals.user?.id;
    if (!id) {
      return res
        .status(403)
        .json(
          formatResponse(
            403,
            'Только авторизованные пользователи могут создавать задачи!',
          ),
        );
    }
    try {
      const data = req.body;
      const newTask = await TaskService.create(data);
      if (!newTask) {
        return res
          .status(400)
          .json(formatResponse(400, 'Не создалась', null, 'Ошибка при создании'));
      }
      res.status(201).json(formatResponse(201, 'Задача успешно создана', newTask));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при создании задачи', null, message));
    }
  }

  // Обновить задачу
  static async update(req, res) {
    const userId = res.locals.user?.id;
    if (!userId) {
      return res.status(403).json(formatResponse(403, 'Необходима авторизация!'));
    }
    try {
      const { id } = req.params;
      const data = req.body;
      const taskToUpdate = await TaskService.getById(id);
      if (!taskToUpdate) {
        return res.status(404).json(formatResponse(404, 'Задача не найдена'));
      }
      if (taskToUpdate.authorId !== userId)
        return res
          .status(403)
          .json(formatResponse(403, 'IDOR У вас нет прав на редактирование этой задачи'));

      const updatedTask = await TaskService.update(id, data);
      if (!updatedTask) {
        return res
          .status(400)
          .json(formatResponse(400, 'Не изменилось', null, 'Ошибка при обновлении'));
      }
      res.status(200).json(formatResponse(200, 'Задача успешно обновлена', updatedTask));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при обновлении задачи', null, message));
    }
  }

  // Удалить задачу
  static async delete(req, res) {
    const userId = res.locals.user?.id;
    if (!userId) {
      return res.status(403).json(formatResponse(403, 'Необходима авторизация!'));
    }
    try {
      const { id } = req.params;
      const taskToDelete = await TaskService.getById(id);
      if (!taskToDelete)
        return res.status(404).json(formatResponse(404, 'Задача не найдена'));
      if (taskToDelete.authorId !== userId)
        return res
          .status(403)
          .json(formatResponse(403, 'IDOR У вас нет прав на удаление этой задачи'));

      const response = await TaskService.delete(id);
      if (!response) {
        return res
          .status(400)
          .json(formatResponse(400, 'Не удалилось', null, 'Ошибка при удалении'));
      }
      res.status(200).json(formatResponse(200, 'Задача удалена успешно', null));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при удалении задачи', null, message));
    }
  }
}

module.exports = TaskController;
