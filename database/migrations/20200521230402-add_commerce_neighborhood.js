"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("Commerces", "neighborhood", {
      allowNull: false,
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn("Commerces", "neighborhood"),
};
