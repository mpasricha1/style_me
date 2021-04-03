'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'google_id', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
  }
};
