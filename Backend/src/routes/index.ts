
import { FastifyInstance } from 'fastify';
import * as UserController from '../controllers/UserController';
import * as CourseController from '../controllers/CourseController';
import * as CoinController from '../controllers/CoinController';
import * as transactionController from '../controllers/TransactionController';
import { VerifyToken } from '../models/prehandler';

export default (app: FastifyInstance) => {
  app.post('/register', UserController.registerHandler);
  app.post('/login', UserController.loginHandler);
  app.get('/users', UserController.getUsersHandler);

  app.post("/createTransaction", {preHandler : VerifyToken} , transactionController.createTransactionHandler);
  app.post("/payTransaction", {preHandler : VerifyToken} , transactionController.markPaymentAsCompletedHandler);


  app.post("/getCoins" , CoinController.getUserCoinsHandler);
  app.post("/createCoin" , CoinController.createCoinHandler);
  app.delete("/deleteCoin" , CoinController.coinDestructor);

  app.get("/getcoursesbypopularity", CourseController.getCoursesByPopularityHandler);
  app.get('/getcoursesbydate', CourseController.getCoursesByDateHandler);
  app.post('/courses', CourseController.createCourseHandler);
  app.get('/courses', CourseController.getCoursesHandler);
  app.get('/courses/:id', CourseController.getCourseByIdHandler);
  app.put('/courses/:id', CourseController.updateCourseHandler);
  app.delete('/courses/:id', CourseController.deleteCourseHandler);

};
