import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //setting default values
  let statusCode = 500;
  let message = 'Something Went wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
    // console.log(simplifiedError);
  }

  //Mongoose error
  else if (err?.name === 'ValidationError') {
    // console.log('ami mongoose er error');

    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    (message = err?.message),
      (errorSources = [
        {
          path: '',
          message: err.message,
        },
      ]);
  } else if (err instanceof Error) {
    statusCode = statusCode;
    (message = err.message),
      (errorSources = [
        {
          path: '',
          message: err.message,
        },
      ]);
  }

  //ultimate return
  return res.status(statusCode).json({
    succces: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

