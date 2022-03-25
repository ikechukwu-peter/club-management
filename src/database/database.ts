import { Sequelize } from 'sequelize';
import config from '../config/config';

    const sequelize = new Sequelize(
      config.development.postgres.database,
      config.development.postgres.username,
      config.development.postgres.password,
      {
        host: config.development.postgres.host,
        dialect: 'postgres'
      });
   



// const sequelize = {
// if (process.env.NODE_ENV == 'developemt') {

//     const sequelize = new Sequelize(
//       config.development.postgres.database,
//       config.development.postgres.username,
//       config.development.postgres.password,
//       {
//         host: config.development.postgres.host,
//         dialect: 'postgres'
//       });
   
//   }
//   else {
//     const sequelize = new Sequelize(
//       config.production.postgres.database,
//       config.production.postgres.username,
//       config.production.postgres.password,
//       {
//         host: config.production.postgres.host,
//         dialect: 'postgres'
//       });
  
//   }
// }

export default sequelize;