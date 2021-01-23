'use strict';
const {generatePassword} = require('../helpers/passwordHelper')
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
        password: generatePassword('123456'),
        role: 'teacher',
        address: 'Jl. Mangga harum manis',
        position: [-6.200000, 106.816666],
        telpon_number: '08123456789',
        subjects: ['Mathematics', 'Chemistry'],
        background: 'Universitas ABC, S1 Mathematics',
        price: 100000,
        rating: 4,
        income: 0,
        available_status: false,
        image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg',
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
