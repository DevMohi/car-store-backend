import { NextFunction, Request, RequestHandler, Response } from "express";

//ekta function recieve korbe jeita ekta promise return korbe
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
