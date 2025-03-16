import { FastifyReply, FastifyRequest } from 'fastify';
import { Course, ICourse, SpecificCourse } from '../models/Course';
import statSeeCourses from '../models/statSeeCourses';
import { UpdateQuery } from 'mongoose';

const calculateAvgNote = (course: any) => {
  const totalNotes = course.note.reduce((sum: any, n: { note: any }) => sum + n.note, 0);
  return course.note.length > 0 ? (totalNotes / course.note.length) : 0;
};

export const createCourseHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const course = new Course(req.body);
    await course.save();
    reply.status(201).send(course);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const createSpecificCourseHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const specificCourse = new SpecificCourse(req.body);
    await specificCourse.save();
    reply.status(201).send(specificCourse);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getCoursesHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const courses = await Course.find();
    reply.send(courses);
  } catch (err) {
    reply.status(500).send(err);
  }
};



export const getCourseByIdHandler = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      reply.status(404).send({ message: 'Course not found' });
      return;
    }
    reply.send(course);
  } catch (err) {
    reply.status(500).send(err);
  }
};
export const getSpecificCoursesHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const specificCourses = await SpecificCourse.find().populate('courseId');
    reply.send(specificCourses);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getSpecificCoursesByDateHandler = async (req: FastifyRequest<{ Querystring: { date: string } }>, reply: FastifyReply) => {
  try {
    const { date } = req.query;
    const specificCourses = await SpecificCourse.find({ date }).populate('courseId');
    reply.send(specificCourses);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const updateCourseHandler = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body as UpdateQuery<ICourse>, { new: true });
    if (!course) {
      reply.status(404).send({ message: 'Course not found' });
      return;
    }
    reply.send(course);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const deleteCourseHandler = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    await SpecificCourse.deleteMany({ courseId: req.params.id });
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      reply.status(404).send({ message: 'Course not found' });
      return;
    }
    reply.send({ message: 'Course and its specific sessions deleted successfully' });
  } catch (err) {
    reply.status(500).send(err);
  }
};
export function getCoursesByPopularityHandler(arg0: string, getCoursesByPopularityHandler: any) {
  throw new Error('Function not implemented.');
}

