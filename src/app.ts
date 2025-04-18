import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: [
//       'http://localhost:5173',
//       'https://car-shop-frontend-assignment-4.vercel.app',
//     ],
//     credentials: true,
//   }),
// );

app.use(
  cors({
<<<<<<< HEAD
    origin: 'https://car-shop-frontend-assignment-4.vercel.app',
=======
    origin: [
      'http://localhost:5173',
      'https://car-shop-frontend-assignment-4.vercel.app',
    ],
>>>>>>> bcb860ce1d8f1bbdf8d0a2128fcd89430df2b904
    credentials: true,
  }),
);

//application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());

//global error handler
app.use(globalErrorHandler);

//Not found route
app.use(notFound);

export default app;
