import {Router} from 'express';
import { sendResponse, handleError } from '../utils';
import { responseCode } from '../constants';

const router = Router();

router.route('/').get(async(req, res) => {
  try{
    return sendResponse(res, responseCode.OK.code, 'Good Day', responseCode.OK.msg);
  }
  catch(err){
    return handleError(res, err);
  }
});


export default router; 