import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { v4 as uuidv4 } from 'uuid'
import { Op } from 'sequelize'
import {
  WaBlasUsersCategoryModel,
  type WaBlasUsersCategoryAttributes
} from '../../models/waBlasUsersCategory'

export const createWaBlasUsersCategory = async (
  req: any,
  res: Response
): Promise<any> => {
  const requestBody = req.body as WaBlasUsersCategoryAttributes

  const emptyField = requestChecker({
    requireList: ['waBlasUserCategoryName'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const waBlasUser = await WaBlasUsersCategoryModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        waBlasUserCategoryName: { [Op.eq]: requestBody.waBlasUserCategoryName }
      }
    })

    if (waBlasUser !== null) {
      const message = `category ${waBlasUser.waBlasUserCategoryName} already registered `
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    requestBody.waBlasUserCategoryId = uuidv4()
    await WaBlasUsersCategoryModel.create(requestBody)

    const response = ResponseData.default
    const result = { message: 'success' }
    response.data = result
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
