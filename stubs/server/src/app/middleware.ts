import { NextFunction, Request, Response } from 'express';

const RejectResponse = (response: Response) => {
  response.status(401).json({
    message: `You are not authorized!`,
    status: 'failed',
    code: 401,
  });
};

export const Auth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers['authorization'];

  if (!authorization) {
    return RejectResponse(response);
  }

  const bearer = authorization.split(' ')[1];

  request.headers['token'] = bearer;

  next();
};
