
import { FastifyInstance } from 'fastify';
import * as UserController from '../controllers/UserController';
import * as CourseController from '../controllers/CourseController';
import * as CoinController from '../controllers/CoinController';
import * as transactionController from '../controllers/TransactionController';
import * as LikeController from '../controllers/LikeController';
import { VerifyAdminToken, VerifyToken } from '../models/prehandler';
import * as ReviewController from '../controllers/ReviewController';
// import * as AdminController from "../controllers/AdminController";
interface AddReviewRequestBody {
  courseId: string;
  rating: number;
  comment: string;
}

export default (app: FastifyInstance) => {
  app.post('/register', UserController.registerHandler);
  app.post('/login', UserController.loginHandler);

  app.post("/createTransaction", transactionController.createTransactionHandler);
  app.post("/payTransaction", {preHandler : VerifyToken} , transactionController.markPaymentAsCompletedHandler);

  app.get("/isliked", {preHandler : VerifyToken}, LikeController.checkIfLikedHandler);
  app.put("/like", {preHandler : VerifyToken}, LikeController.addLikeHandler);
  app.get("/getlikescount", {preHandler : VerifyToken} ,LikeController.getLikeCountHandler);
  app.delete("/like", {preHandler : VerifyToken}, LikeController.removeLikeHandler);
  app.post("/profile", {preHandler : VerifyToken}, UserController.getProfileHandler);
  
  app.put("/review", {preHandler : VerifyToken}, ReviewController.addReviewHandler);
  app.get("/reviews/:courseId", ReviewController.getCourseReviewsHandler);
  app.get("/review", ReviewController.getReviewByIdHandler);
  app.get("/filterreviews", ReviewController.filterReviewsByRatingHandler);
  app.delete("/review", {preHandler : VerifyToken}, ReviewController.deleteReviewHandler);
  app.get("/verifyToken", UserController.VerifyToken);
  app.post('/admin/login', UserController.loginHandler);
  app.get('/admin/users', {preHandler : VerifyAdminToken} ,UserController.getUsersHandler);


  //refacto entiere du systeme de cours et donc de transaction. ceci explique cela
    // app.get('/admin/usersstats', {preHandler : VerifyAdminToken}, AdminController.getUserStats);
    // app.get('/admin/coursesstats', {preHandler : VerifyAdminToken}, AdminController.getCourseStats);
    // app.get('/admin/userpro', {preHandler : VerifyAdminToken}, AdminController.getUserProStats);


  app.post('/validemail', UserController.verifyMail);
  app.post('/confirmMail', UserController.confirmMail);
    // demande de parler de modalité

  // app.post("/admin/errasetransaction")
  // app.post("/admin/forcevalidationtransaction")
  // app.delete("/admin/user:id") 
  // app.delete('/admin/courses:id');
  // app.post("/admin/createCoin:id");
  // app.delete("/admin/deleteCoin:id");
  // app.post("/admin/addnewmembertotransaction")
  // app.post("/admin/banmemberfromtransaction")


  app.post("/getCoins",  {preHandler : VerifyToken} ,CoinController.getUserCoinsHandler);
  app.post("/createCoin" , CoinController.createCoinHandler);
  app.delete("/deleteCoin" , CoinController.coinDestructor);
  app.post('/courses', CourseController.createCourseHandler);
  app.post('/specific-courses', CourseController.createSpecificCourseHandler);
  app.get('/specific-courses/:courseId', CourseController.getSpecificCoursesHandler);
  app.get('/specific-courses/date', CourseController.getSpecificCoursesByDateHandler);
  app.get('/courses', CourseController.getCoursesHandler);
  app.get("/courses/:id", CourseController.getCourseByIdHandler);
  app.put('/courses/:id', CourseController.updateCourseHandler);
  // app.delete('/courses/:id', CourseController.deleteCourseHandler); il y a besoin de rajouter beaucoup beaucoup de condition c'est pas aussi simple

};
