   
//const { User, Club, ClubMember } = require('../models');
import User from '../models/user.model'
import Club from '../models/club.model'
import ClubMember from '../models/clubmember.models'
  //user to club
  User.hasMany(Club, {
    onDelete: "CASCADE"
  });
  Club.belongsTo(User);

  //user to club
  Club.hasMany(ClubMember, {
    onDelete: "CASCADE"
  });
  ClubMember.belongsTo(Club);