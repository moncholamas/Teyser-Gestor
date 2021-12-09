'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Rols', [{
       rol: 'admin',
    },
    {
      rol: 'operator',
   }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('People', null, {});
  }
};
