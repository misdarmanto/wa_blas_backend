import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import {
  type WaBlasUsersCategoryAttributes,
  WaBlasUsersCategoryModel
} from '../../models/waBlasUsersCategory'

export const updateWaBlasUsersCategory = async (
  req: any,
  res: Response
): Promise<any> => {
  const requestBody = req.body as WaBlasUsersCategoryAttributes

  const emptyField = requestChecker({
    requireList: ['waBlasUserCategoryId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await WaBlasUsersCategoryModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        waBlasUserCategoryId: { [Op.eq]: requestBody.waBlasUserCategoryId }
      }
    })

    if (result === null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: WaBlasUsersCategoryAttributes | any = {
      ...(requestBody.waBlasUserCategoryName.length > 0 && {
        waBlasUserCategoryName: requestBody.waBlasUserCategoryName
      })
    }

    await WaBlasUsersCategoryModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        waBlasUserCategoryId: { [Op.eq]: requestBody.waBlasUserCategoryId }
      }
    })

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
