/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface SessionAttributes extends ZygoteAttributes {
  sessionId: string
  sessionAdminId: string
  session: string
  sessionExpiredOn: number
}

type SessionCreationAttributes = Optional<
  SessionAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

interface SessionInstance
  extends Model<SessionAttributes, SessionCreationAttributes>,
    SessionAttributes {}

export const SessionModel = sequelize.define<SessionInstance>(
  'session',
  {
    ...ZygoteModel,
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sessionAdminId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    session: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sessionExpiredOn: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'session',
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
