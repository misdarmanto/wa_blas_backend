/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import moment from 'moment'

export interface WaBlasUsersAttributes extends ZygoteAttributes {
  waBlasUserId: string
  waBlasUserName: string
  waBlasUserWhatsappNumber: string
  waBlasUserCategory: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type WaBlasUsersCreationAttributes = Optional<
  WaBlasUsersAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be

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
    waBlasUserCategory: {
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
