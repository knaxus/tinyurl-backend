/* eslint-disable no-console */
import redis from 'redis';

const redisClient  = redis.createClient();

redisClient.on('connect', function(){
  console.log('Redis client connected');
});

redisClient.on('error', function(error){
  console.log('Something went wrong', error);
})

export default redisClient;