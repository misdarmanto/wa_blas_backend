/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wa_blas_users', {
      ...ZygoteModel,
      wa_blas_user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      wa_blas_user_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      wa_blas_user_whatsapp_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      wa_blas_user_category: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wa_blas_users')
  }
}
