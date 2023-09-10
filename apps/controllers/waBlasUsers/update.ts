import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { WaBlasUsersModel, type WaBlasUsersAttributes } from '../../models/waBlasUsers'

export const updateWaBlasUsers = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as WaBlasUsersAttributes

  const emptyField = requestChecker({
    requireList: ['waBlasUserId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await WaBlasUsersModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        waBlasUserId: { [Op.eq]: requestBody.waBlasUserId }
      }
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: WaBlasUsersAttributes | any = {
      ...(requestBody.waBlasUserName.length > 0 && {
        waBlasUserName: requestBody.waBlasUserName
      }),
      ...(requestBody.waBlasUserWhatsappNumber.length > 0 && {
        waBlasUserWhatsappNumber: requestBody.waBlasUserWhatsappNumber
      }),
      ...(requestBody.waBlasUserCategory.length > 0 && {
        waBlasUserCategory: requestBody.waBlasUserCategory
      })
    }

    await WaBlasUsersModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        waBlasUserId: { [Op.eq]: requestBody.waBlasUserId }
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
