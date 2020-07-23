"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("Commerces", "state", {
      allowNull: false,
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn("Commerces", "state"),
};
