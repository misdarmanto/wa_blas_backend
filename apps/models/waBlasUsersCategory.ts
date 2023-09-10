/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import moment from 'moment'

export interface WaBlasUsersCategoryAttributes extends ZygoteAttributes {
  waBlasUserCategoryId: string
  waBlasUserCategoryName: string
}

type WaBlasUsersCategoryCreationAttributes = Optional<
  WaBlasUsersCategoryAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

interface WaBlasUsersCategoryInstance
  extends Model<WaBlasUsersCategoryAttributes, WaBlasUsersCategoryCreationAttributes>,
    WaBlasUsersCategoryAttributes {}

export const WaBlasUsersCategoryModel = sequelize.define<WaBlasUsersCategoryInstance>(
  'wa_blas_users_category',
  {
    ...ZygoteModel,
    waBlasUserCategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    waBlasUserCategoryName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'wa_blas_users_category',
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
