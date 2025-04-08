import { NextFunction, Request, Response } from 'express';
// import { status } from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API Not found',
    error: '',
  });
};

export default notFound;


