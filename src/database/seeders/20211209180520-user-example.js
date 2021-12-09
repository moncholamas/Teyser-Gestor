'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [{
       name: 'Eloy',
       lastName: 'Lamas',
       email: 'ejemplo@ejemplo.com',
       rolId: 1
     },
     {
      name: 'Manuel',
      lastName: 'Lamas',
      email: 'ejemplo2@ejemplo.com',
      rolId: 2
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('People', null, {});
  }
};
