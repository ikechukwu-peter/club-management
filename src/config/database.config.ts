import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE!, process.env.DATABASE!, process.env.DB_PASS,{
  host: process.env.DATABASE_HOST,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 100000
  },
  dialect: 'postgres'
});

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log(`DB connected`);
    // const syncDB = await sequelize.sync({ force: true }); //remove in production
    // console.log(`All models were successfully synchronized ${syncDB}`);
  } catch (error) {
    console.log(error);
    console.log('Unable to connect to the database');
  }
}

authenticate();

export default sequelize