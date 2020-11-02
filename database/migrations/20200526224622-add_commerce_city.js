"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("Commerces", "city", {
      allowNull: false,
      type: Sequelize.STRING,
    }),

  down: (queryInterface) => queryInterface.removeColumn("Commerces", "city"),
};
