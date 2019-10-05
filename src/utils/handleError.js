import { responseCodeCollection } from '../constants/responseCodes';
import { sendResponse } from '.';

export default function handleError(res, err) {
  /* eslint-disable */
  
   console.error('Error: --------->', err);
  

  /* eslint-enable */
  if (responseCodeCollection.indexOf(err.code) !== -1) {
    return sendResponse(res, err.code, {}, err.message);
  }

  if (err.code === 'DC409') {
    return sendResponse(
      res,
      409,
      {},
      err.msg || err.message || 'Duplicate Data',
    );
  }

  if (err.code === 'DC404') {
    return sendResponse(res, 404, {}, 'Data Not found');
  }

  if (err.code === 'ERR_OSSL_EVP_BAD_DECRYPT') {
    return sendResponse(res, 400, {}, 'Invalid Oauth-Token');
  }

  if (err.parent) {
    if (err.parent.code === 'ER_DUP_ENTRY') {
      return sendResponse(res, 409, {}, 'Duplicate entry, data already exists');
    }

    if (err.parent.code === 'ER_NO_REFERENCED_ROW_2') {
      return sendResponse(res, 404, {}, 'Missing related data');
    }
  }

  if (err.original && err.original.code === 'ER_NO_REFERENCED_ROW_2') {
    return sendResponse(res, 404, {}, 'Invalid parameter Id, do not exists');
  }

  if (err.response && err.response.status === 401) {
    return sendResponse(res, 401, {}, 'Unauthorized Access');
  }

  return sendResponse(res, 500, {}, 'Something went wrong');
}

export function customErrorThrow(
  code,
  msg,
) {
  const err = new Error(msg);
  err.code = code;
  throw err;
}