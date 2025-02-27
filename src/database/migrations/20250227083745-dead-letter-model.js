'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('dead_letter_queues', {
      id: {
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      payload: DataType.JSON,
      type: DataType.STRING,
      created_at: DataType.DATE,
      updated_at: DataType.DATE,
      deleted_at: {
        allowNull: true,
        type: DataType.DATE,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('dead_letter_queues');
  },
};
