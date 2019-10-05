import Sequelize from 'sequelize'

const db={};

const sequelize= new Sequelize(process.env.Database,process.env.Database_username,process.env.Database_password,{
    host:'localhost',
    dialect:'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;