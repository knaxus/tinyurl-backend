import Sequelize from 'sequelize'
import {sequelize} from '../config/database'


const tinyUrl = sequelize.define('tinyUrl',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    short_url:{
        type:Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    long_url:{
        type:Sequelize.STRING,
        allowNull: false
    }

},{ tableName: 'tinuUrl',timestamps: true,})

export {
    tinyUrl,
}