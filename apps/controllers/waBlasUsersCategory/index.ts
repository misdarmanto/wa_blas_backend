import { createWaBlasUsersCategory } from './create'
import { findAllWaBlasUsersCategory, findDetailWaBlasUserCategory } from './find'
import { removeWaBlasUsersCategory } from './remove'
import { updateWaBlasUsersCategory } from './update'

export const waBlasUsersCategoryController = {
  create: createWaBlasUsersCategory,
  findAll: findAllWaBlasUsersCategory,
  findOne: findDetailWaBlasUserCategory,
  remove: removeWaBlasUsersCategory,
  update: updateWaBlasUsersCategory
}
