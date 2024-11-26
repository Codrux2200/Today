
import { FastifyInstance } from 'fastify';
import * as UserController from '../controllers/UserController';
import * as CourseController from '../controllers/CourseController';
import * as CreatorController from '../controllers/CreatorController';

export default (app: FastifyInstance) => {
  app.post('/users', UserController.createUserHandler);
  app.get('/users', UserController.getUsersHandler);

  app.post('/courses', CourseController.createCourseHandler);
  app.get('/courses', CourseController.getCoursesHandler);
  app.get('/courses/:id', CourseController.getCourseByIdHandler);
  app.put('/courses/:id', CourseController.updateCourseHandler);
  app.delete('/courses/:id', CourseController.deleteCourseHandler);

  app.post('/creators', CreatorController.createCreatorHandler);
  app.get('/creators', CreatorController.getCreatorsHandler);
  app.get('/creators/:id', CreatorController.getCreatorByIdHandler);
};
