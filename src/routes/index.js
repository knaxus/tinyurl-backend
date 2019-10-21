import {Router} from 'express';
import { sendResponse, handleError } from '../utils';
import { responseCode } from '../constants';
import { saveLongUrl, getLongUrl } from '../servies';

const router = Router();

router.route('/short-url/long-url').get(async(req, res) => {
  try{
    const { shortUrl } = req.body;
    if (!shortUrl) {
      return sendResponse(res, responseCode.UNPROCESSABLE_ENTITY.code,{},responseCode.UNPROCESSABLE_ENTITY.msg);
    }
    const longUrl = await getLongUrl({ shortUrl });
    return sendResponse(res, responseCode.OK.code, longUrl, responseCode.OK.msg);

  }
  catch(err) {
    return handleError(res, err);
  }
});

router.route('/short-url/create').post(async(req, res) => {
  try{
    const { longUrl } = req.body;
    if (!longUrl){
      return sendResponse(res, responseCode.UNPROCESSABLE_ENTITY.code,{},responseCode.UNPROCESSABLE_ENTITY.msg);
    }
    const shortUrl = await saveLongUrl({
      longUrl,
    });
    return sendResponse(res, responseCode.OK.code, shortUrl, responseCode.OK.msg);
  }
  catch(err){
    return handleError(res, err);
  }
});


export default router; 