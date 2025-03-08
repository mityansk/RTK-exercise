'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          id: 1,
          description: 'Погладить кошку',
          authorId: 1,
          isDone: false,
        },
        {
          id: 2,
          description: 'Выучить хуки Реакта',
          authorId: 1,
          isDone: false,
        },
        {
          id: 3,
          description: 'Понять и простить Redux',
          authorId: 1,
          isDone: false,
        },
      ],
      {},
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
