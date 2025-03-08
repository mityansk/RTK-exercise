'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Task, Comment }) {
      this.hasMany(Task, { foreignKey: 'authorId' });
      this.hasMany(Comment, { foreignKey: 'authorId' });
    }
  }
  User.init(
    {
      userName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
