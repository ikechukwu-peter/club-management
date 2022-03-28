import { DataTypes } from 'sequelize'
import sequelize from '../config/database.config'

const Club = sequelize.define('club', {
    id: {
        type: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
})
export default Club;