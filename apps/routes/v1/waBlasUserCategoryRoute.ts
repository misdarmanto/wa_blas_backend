/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { waBlasUsersCategoryController } from '../../controllers/waBlasUsersCategory'

export const waBlasUserCategoryRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/wa-blas-users-categories', route)

  route.get(
    '/list',
    async (req: Request, res: Response) =>
      await waBlasUsersCategoryController.findAll(req, res)
  )
  route.get(
    '/detail/:waBlasUserCategoryId',
    async (req: Request, res: Response) =>
      await waBlasUsersCategoryController.findOne(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) =>
      await waBlasUsersCategoryController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) =>
      await waBlasUsersCategoryController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) =>
      await waBlasUsersCategoryController.remove(req, res)
  )
}
