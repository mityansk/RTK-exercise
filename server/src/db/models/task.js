'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ User, Comment }) {
      this.belongsTo(User, { foreignKey: 'authorId' });
      this.hasMany(Comment, { foreignKey: 'taskId' });
    }
  }
  Task.init(
    {
      description: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      isDone: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Task',
    },
  );
  return Task;
};
