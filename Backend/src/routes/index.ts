
import { FastifyInstance } from 'fastify';
import * as UserController from '../controllers/UserController';
import * as CourseController from '../controllers/CourseController';
import * as CoinController from '../controllers/CoinController';
import * as transactionController from '../controllers/TransactionController';
import { VerifyAdminToken, VerifyToken } from '../models/prehandler';
import * as AdminController from "../controllers/AdminController";

export default (app: FastifyInstance) => {
  app.post('/register', UserController.registerHandler);
  app.post('/login', UserController.loginHandler);

  app.post("/createTransaction", transactionController.createTransactionHandler);
  app.post("/payTransaction", {preHandler : VerifyToken} , transactionController.markPaymentAsCompletedHandler);

  
  app.post('/admin/login', UserController.loginHandler);
  app.get('/admin/users', {preHandler : VerifyAdminToken} ,UserController.getUsersHandler);
  app.get('/admin/usersstats', {preHandler : VerifyAdminToken}, AdminController.getUserStats);
  app.get('/admin/coursesstats', {preHandler : VerifyAdminToken}, AdminController.getCourseStats);
  app.get('/admin/userpro', {preHandler : VerifyAdminToken}, AdminController.getUserProStats);

    // demande de parler de modalité

  // app.post("/admin/errasetransaction")
  // app.post("/admin/forcevalidationtransaction")
  // app.delete("/admin/user:id") 
  // app.delete('/admin/courses:id');
  // app.post("/admin/createCoin:id");
  // app.delete("/admin/deleteCoin:id");
  // app.post("/admin/addnewmembertotransaction")
  // app.post("/admin/banmemberfromtransaction")


  app.post("/getCoins", CoinController.getUserCoinsHandler);
  app.post("/createCoin" , CoinController.createCoinHandler);
  app.delete("/deleteCoin" , CoinController.coinDestructor);

  app.get("/getcoursesbypopularity", CourseController.getCoursesByPopularityHandler);
  app.get('/getcoursesbydate', CourseController.getCoursesByDateHandler);
  app.post('/courses', CourseController.createCourseHandler);
  app.get('/courses', CourseController.getCoursesHandler);
  app.get('/courses/:id', {preHandler : VerifyToken} ,CourseController.getCourseByIdHandler);
  app.put('/courses/:id', CourseController.updateCourseHandler);
  // app.delete('/courses/:id', CourseController.deleteCourseHandler); il y a besoin de rajouter beaucoup beaucoup de condition c'est pas aussi simple

};
