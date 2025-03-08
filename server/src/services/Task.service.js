const { Task } = require('../db/models');

class TaskService {
  // Получить все задачи
  static async getAll() {
    return Task.findAll();
  }

  // Получить задачи по userId
  static async getAllByUser(userId) {
    return Task.findAll({ where: { authorId: userId } });
  }

  // Получить задачу по ID
  static async getById(id) {
    return Task.findByPk(id);
  }

  // Создать новую задачу
  static async create(data) {
    return Task.create(data);
  }

  // Обновить задачу
  static async update(id, data) {
    const task = Task.findByPk(id);
    if (!task) {
      return null;
    }
    return Task.update(data);
  }

  // Удалить задачу
  static async delete(id) {
    const task = Task.findByPk(id);
    if (!task) {
      return null;
    }
    return Task.destroy();
  }
}

module.exports = TaskService;