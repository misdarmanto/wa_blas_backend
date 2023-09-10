import { createWaBlasUsers } from './create'
import { findAllWaBlasUsers, findDetailWaBlasUser } from './find'
import { removeWaBlasUsers } from './remove'
import { updateWaBlasUsers } from './update'

export const waBlasUsersController = {
  create: createWaBlasUsers,
  findAll: findAllWaBlasUsers,
  findOne: findDetailWaBlasUser,
  remove: removeWaBlasUsers,
  update: updateWaBlasUsers
}
