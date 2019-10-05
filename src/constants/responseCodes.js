const responseCodes = {
  OK: {
    code: 200,
    msg: 'Good to go',
  },
  RECORD_CREATED: {
    code: 201,
    msg: 'Record crearted successfully',
  },
  BAD_REQUEST: {
    code: 400,
    msg: 'Bad Request',
  },
  UNAUTHORIZED: {
    code: 401,
    msg: 'Please login/register',
  },
  FORBIDDEN: {
    code: 403,
    msg: 'You are not authorized',
  },
  NOT_FOUND: {
    code: 404,
    msg: 'Data not found/Invalid data sent',
  },
  SERVER_ERROR: {
    code: 500,
    msg: 'Something went wrong',
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    msg: 'Error in paramerters/query sent',
  },
  DUPLICATE_DATA: {
    code: 409,
    msg: 'Duplicate data',
  },
};

export const responseCodeCollection = [401, 403, 404, 409, 422, 500, 503];

export default responseCodes;