import { DataTypes } from 'sequelize'
import sequelize from '../config/database.config'


const ClubMember = sequelize.define('clubmemeber', {
    id: {
        type: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
})
export default ClubMember;