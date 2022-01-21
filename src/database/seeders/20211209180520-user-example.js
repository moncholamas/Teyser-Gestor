'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [{
       name: 'Eloy',
       lastName: 'Lamas',
       mail: 'ejemplo@ejemplo.com',
       rolId: 1,
       password: 'qwe',
       createdAt: new Date(),
       updatedAt: new Date()
     },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('People', null, {});
  }
};
