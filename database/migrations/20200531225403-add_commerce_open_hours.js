'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Commerces', 'open_hours', {
        allowNull: false,
        type: Sequelize.STRING
    })
  },  

  down: (queryInterface) => {
    return queryInterface.removeColumn('Commerces', 'open_hours')
  }
};
