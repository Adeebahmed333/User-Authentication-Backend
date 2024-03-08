'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
      validate:{
        isEmail:true
      }
      },
      userName: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
      validate:{
        len:[3,50]
      }
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          len:[8,50]
        }
      },
      resettoken:{
       type:sequelize.STRING,
       allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};