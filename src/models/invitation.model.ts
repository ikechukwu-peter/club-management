import { DataTypes } from 'sequelize'
import User from './user.model'
import Club from './club.model'
import sequelize from '../database/database'

const Invitation = sequelize.define('invitation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'rejected', 'accepted')
    }

})

Invitation.belongsTo(User, { foreignKey: 'user_id' });
Invitation.hasOne(Club, { foreignKey: 'club_admin' });
export default Invitation;