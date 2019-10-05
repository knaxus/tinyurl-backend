import util from 'util';
import redisClient from '../config/redis'
import models from '../config/db';
import { convertIntoBase64 } from '../utils/convertIntoBase64';

const saveToRedis = util.promisify(redisClient.set);
const getFromRedis = util.promisify(redisClient.get);

export async function saveLongUrl({
  longUrl,
  counter,
}){
  try{
    const shortUrl = convertIntoBase64(counter);
    await saveToRedis(shortUrl,longUrl);
    await models.sequelize.query(
      'INSERT INTO tinyUrl (short_url, long_url) VALUES (?, ?)',{
      replacements :[shortUrl, longUrl],
      type: models.sequelize.QueryTypes.INSERT,
    });
  }
  catch(err){
    throw err;
  }
}

export async function getchLongUrl({
  shortUrl,
}){
  try{
    let longUrl = await getFromRedis(shortUrl);
    if (longUrl){
      return longUrl;
    }
    longUrl = await models.sequelize.query(
      'SELECT long_url FROM tinyUrl WHERE short_url = ?;',{
      replacements: [shortUrl],
      type: models.sequelize.QueryTypes.SELECT
    });
    
    if(!longUrl.length){
      return null;
    }
    return longUrl[0];
  }
  catch(err){
    throw err;
  }
}