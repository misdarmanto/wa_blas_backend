/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import moment from 'moment'
import { WaBlasUsersCategoryModel } from './waBlasUsersCategory'

export interface WaBlasUsersAttributes extends ZygoteAttributes {
  waBlasUserId: string
  waBlasUserName: string
  waBlasUserWhatsappNumber: string
  waBlasUserCategoryId: string
}

type WaBlasUsersCreationAttributes = Optional<
  WaBlasUsersAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

interface WaBlasUsersInstance
  extends Model<WaBlasUsersAttributes, WaBlasUsersCreationAttributes>,
    WaBlasUsersAttributes {}

export const WaBlasUsersModel = sequelize.define<WaBlasUsersInstance>(
  'wa_blas_users',
  {
    ...ZygoteModel,
    waBlasUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    waBlasUserName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    waBlasUserWhatsappNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    waBlasUserCategoryId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'wa_blas_users',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB',
    hooks: {
      beforeCreate: (record, options) => {
        const now = moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss')
        record.createdAt = now
        record.updatedAt = null
      },
      beforeUpdate: (record, options) => {
        const now = moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss')
        record.updatedAt = now
      }
    }
  }
)

WaBlasUsersModel.hasOne(WaBlasUsersCategoryModel, {
  as: 'category',
  sourceKey: 'waBlasUserCategoryId',
  foreignKey: 'waBlasUserCategoryId'
})
