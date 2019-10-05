import { customErrorThrow } from '../utils';
export function convertIntoBase64(number){
  try{
    const options = '01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let hashStr = '';
    while(number>0){
      const remainder = number%62;
      hashStr = options[remainder] + hashStr;
      number=Math.floor(number/62);
    }
    if(hashStr.length>7){
      customErrorThrow(400, 'Hash generated length is greater than 7')
    }
    return hashStr;
  }
  catch(err){
    throw err;
 }
}