'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('users', {
      id: {
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataType.STRING,
      password: DataType.STRING,
      created_at: DataType.DATE,
      updated_at: DataType.DATE,
      deleted_at: {
        allowNull: true,
        type: DataType.DATE,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('user');
  },
};
