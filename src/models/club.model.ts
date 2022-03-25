import { DataTypes } from 'sequelize'
import User from './user.model'
import sequelize from '../database/database'

const Club = sequelize.define('club', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    club_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    club_members: {
        type: DataTypes.STRING,
        allowNull: true
    },


})

Club.hasMany(User, { foreignKey: 'club_admin' });
export default Club;