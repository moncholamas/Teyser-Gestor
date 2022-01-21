'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Rols', [{
       rol: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      rol: 'operator',
      createdAt: new Date(),
      updatedAt: new Date()
   }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Rols', null, {});
  }
};
