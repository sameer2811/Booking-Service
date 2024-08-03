'use strict';


/** @type {import('sequelize-cli').Migration} */

const {
  BOOKING_STATUS
} = require('../utils/common/enums');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: [BOOKING_STATUS.BOOKED, BOOKING_STATUS.CANCELLED, BOOKING_STATUS.INITIATED, BOOKING_STATUS.PENDING],
        defaultValue: BOOKING_STATUS.INITIATED,
        allowNull: false
      },
      totalCost: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      noOfseats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};