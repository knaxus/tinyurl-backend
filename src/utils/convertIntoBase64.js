export function convertIntoBase64(number){
  const options = '01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let hashStr = '';
  while(number>0){
    const remainder = number%62;
    hashStr = options[remainder] + hashStr;
    number/=62;
  }
  return hashStr;
}