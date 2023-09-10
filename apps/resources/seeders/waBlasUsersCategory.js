/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('wa_blas_users_category', [
      {
        wa_blas_user_category_id: 'w1eqw2421221erwerewr23423rewr',
        wa_blas_user_category_name: 'cafe'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wa_blas_users_category', null, {})
  }
}
