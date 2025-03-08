'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Task }) {
      this.belongsTo(User, { foreignKey: 'authorId' });
      this.belongsTo(Task, { foreignKey: 'taskId' });
    }
  }
  Comment.init(
    {
      body: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      taskId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  );
  return Comment;
};
