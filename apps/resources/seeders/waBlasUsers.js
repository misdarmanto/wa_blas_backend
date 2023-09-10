/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('wa_blas_users', [
      {
        wa_blas_user_id: '424323423423erwerewr23423rewr',
        wa_blas_user_name: 'user 1',
        wa_blas_user_whatsapp_number: '08232113353',
        wa_blas_user_category: 'cafe'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wa_blas_users', null, {})
  }
}
