import { DataTypes } from 'sequelize'
import sequelize from '../config/database.config'

const Club = sequelize.define('club', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
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