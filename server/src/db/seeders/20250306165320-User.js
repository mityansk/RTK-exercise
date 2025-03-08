/* eslint-disable no-unused-vars */

'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordAdmin = await bcrypt.hash('Qwerty123!', 10);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          userName: 'admin',
          email: 'admin@admin.ru',
          password: passwordAdmin,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
