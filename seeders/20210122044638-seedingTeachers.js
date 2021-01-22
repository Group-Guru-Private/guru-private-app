'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Teachers', [
      {
        name: 'User',
        email: 'user@mail.com',
        password: '123456',
        role: 'teacher',
        address: 'Jl. Mangga harum manis',
        position: [-6.200000, 106.816666],
        telpon_number: '08123456789',
        subjects: ['Mathematics', 'Chemistry'],
        background: 'Universitas ABC, S1 Mathematics',
        price: 100000,
        rating: 4,
        income: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Teachers', null, {})
  }
};
