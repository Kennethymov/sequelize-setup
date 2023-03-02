'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      ingredients: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preparation: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        }
      }
    },
    {
      timestamps: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('recipes');
  }
};
