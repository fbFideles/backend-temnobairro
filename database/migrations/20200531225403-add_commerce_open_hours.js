"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("Commerces", "open_hours", {
      allowNull: false,
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn("Commerces", "open_hours"),
};
