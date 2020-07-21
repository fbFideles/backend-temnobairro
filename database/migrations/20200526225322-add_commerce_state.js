"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Commerces", "state", {
      allowNull: false,
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("Commerces", "state");
  },
};
