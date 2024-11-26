
import { FastifyReply, FastifyRequest } from 'fastify';
import Course from '../models/Course';

export const createCourseHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const course = new Course(req.body);
    await course.save();
    reply.status(201).send(course);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getCoursesHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const courses = await Course.find().populate('by members');
    reply.send(courses);
  } catch (err) {
    reply.status(500).send(err);
  }
};

interface GetCourseByIdParams {
  id: string;
}

export const getCourseByIdHandler = async (req: FastifyRequest<{ Params: GetCourseByIdParams }>, reply: FastifyReply) => {
  try {
    const course = await Course.findById(req.params.id).populate('by members');
    if (!course) {
      reply.status(404).send({ message: 'Course not found' });
      return;
    }
    reply.send(course);
  } catch (err) {
    reply.status(500).send(err);
  }
};

interface UpdateCourseParams {
  id: string;
}

interface UpdateCourseBody {
  [key: string]: any;
}

export const updateCourseHandler = async (req: FastifyRequest<{ Params: UpdateCourseParams; Body: UpdateCourseBody }>, reply: FastifyReply) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      reply.status(404).send({ message: 'Course not found' });
      return;
    }
    reply.send(course);
  } catch (err) {
    reply.status(500).send(err);
  }
};

interface DeleteCourseParams {
  id: string;
}

export const deleteCourseHandler = async (req: FastifyRequest<{ Params: DeleteCourseParams }>, reply: FastifyReply) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      reply.status(404).send({ message: 'Course not found' });
      return;
    }
    reply.send({ message: 'Course deleted successfully' });
  } catch (err) {
    reply.status(500).send(err);
  }
};
