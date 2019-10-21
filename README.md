# tinyurl-backend
A short url service for long url.

## How it's work?

### Use redis
Choose redis to perform fetch operation faster.
If short-url is in redis then directly long-url can be return and when short-url is not there then check DB for short-url. 
If short-url is there then update redis and return long-url

### How to get unique short-url?
Store a counter variable in redis and convert counter into Base64. By using this generation of short-url collision can be removed.
Max length of short url can be 7.
```
function convertIntoBase64(counter){
  try{
    const options = '01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let hashStr = '';
    while(counter>0){
      const remainder = counter%62;
      hashStr = options[remainder] + hashStr;
      counter=Math.floor(counter/62);
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
```
