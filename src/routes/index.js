import {Router} from 'express';
import { sendResponse, handleError } from '../utils';
import { responseCode } from '../constants';
import { saveLongUrl } from '../servies';

const router = Router();

router.route('/shortUrl').get(async(req, res) => {
  try{
    const { longUrl } = req.body;
    if (!longUrl){
      return sendResponse(res, responseCode.UNPROCESSABLE_ENTITY.code,{},responseCode.UNPROCESSABLE_ENTITY.msg);
    }
    await saveLongUrl({
      longUrl,
    });
    return sendResponse(res, responseCode.OK.code, 'Good Day', responseCode.OK.msg);
  }
  catch(err){
    return handleError(res, err);
  }
});


export default router; 