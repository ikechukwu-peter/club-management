import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('abndhizf', 'abndhizf', 'sjLi8Ern3d1TbzLZwwhHnxkdR0ccsijQ',{
  host: 'john.db.elephantsql.com ',
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
    const syncDB = await sequelize.sync({ force: true }); //remove in production
    console.log(`All models were successfully synchronized ${syncDB}`);
  } catch (error) {
    console.log(error);
    console.log('Unable to connect to the database');
  }
}

authenticate();

export default sequelize