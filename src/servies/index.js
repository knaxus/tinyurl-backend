import util from 'util';
import redisClient from '../config/redis'
import models from '../config/db';
import { convertIntoBase64 } from '../utils/convertIntoBase64';
import { customErrorThrow } from '../utils';

const saveToRedis = util.promisify(redisClient.set).bind(redisClient);
const getFromRedis = util.promisify(redisClient.get).bind(redisClient);

export async function saveLongUrl({
  longUrl,
}){
  try{
    const result = await longUrlExist(longUrl);
    if (result) {
      customErrorThrow(409, 'Long url already exist');
    }
    const counter = await getFromRedis('counter');    

    const shortUrl = convertIntoBase64(counter);
    await models.sequelize.query(
      'INSERT INTO tiny_url (short_url, long_url) VALUES (?, ?)',{
      replacements :[shortUrl, longUrl],
      type: models.sequelize.QueryTypes.INSERT,
    });

    await saveToRedis(shortUrl,longUrl);
    await saveToRedis('counter', counter + 1);
    return shortUrl;
  }
  catch(err){
    throw err;
  }
}

export async function getLongUrl({
  shortUrl,
}){
  try{
    let longUrl = await getFromRedis(shortUrl);
    if (longUrl){
      return longUrl;
    }
    longUrl = await models.sequelize.query(
      'SELECT long_url FROM tiny_url WHERE short_url = ?;',{
      replacements: [shortUrl],
      type: models.sequelize.QueryTypes.SELECT
    });

    if(!longUrl.length){
      return null;
    }

    await saveToRedis(shortUrl,longUrl[0]);

    return longUrl[0];
  }
  catch(err){
    throw err;
  }
}

async function longUrlExist( longUrl ){
  try{
    const details = await models.sequelize.query(
      'SELECT * FROM tiny_url WHERE long_url = ?;',{
      replacements: [longUrl],
      type: models.sequelize.QueryTypes.SELECT
    });
    
    if (!details.length){
      return false;
    }
    return true;
  }
  catch(err){
    throw err;
  }
}