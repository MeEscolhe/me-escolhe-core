import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/infra/database';
import '@shared/container';
import ClassValidatorError from '@shared/errors/ClassValidatorError';

const app = express();

app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError || err instanceof ClassValidatorError) {
    return response
      .status(err.statusCode)
      .json(err.message);
  }

  return response.status(500).json(err.message);
});

app.listen(8080, () => {
  console.log('🚀 Server started on port 8080');
});
