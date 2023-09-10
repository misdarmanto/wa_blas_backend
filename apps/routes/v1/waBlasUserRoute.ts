/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { waBlasUsersController } from '../../controllers/waBlasUsers'

export const waBlasUserRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/wa-blas-users', route)

  route.get(
    '/list',
    async (req: Request, res: Response) => await waBlasUsersController.findAll(req, res)
  )
  route.get(
    '/detail/:waBlasUserId',
    async (req: Request, res: Response) => await waBlasUsersController.findOne(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await waBlasUsersController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await waBlasUsersController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await waBlasUsersController.remove(req, res)
  )
}
