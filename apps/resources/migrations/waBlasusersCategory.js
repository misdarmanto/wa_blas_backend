/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wa_blas_users_category', {
      ...ZygoteModel,
      wa_blas_user_category_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      wa_blas_user_category_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wa_blas_users_category')
  }
}
