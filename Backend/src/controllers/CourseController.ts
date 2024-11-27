import { FastifyReply, FastifyRequest } from 'fastify';
import Course from '../models/Course';

const calculateAvgNote = (course : any) => {
  const totalNotes = course.note.reduce((sum: any, n: { note: any; }) => sum + n.note, 0);
  const avgNote = course.note.length > 0 ? (totalNotes / course.note.length) : 0;
  return (avgNote / 5) * 10;
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

interface GetCoursesByDateQuery {
  dateOption: 'today' | 'nextTwoDays' | 'previous';
}

export const getCoursesByPopularityHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const courses = await Course.find({}).populate('by members');
    
    const coursesWithPopularity = courses.map((course) => {
      const avgNote = calculateAvgNote(course);
      return {
        ...course.toObject(),
        avgNote
      };
    });

    const filteredCourses = coursesWithPopularity.filter(course => course.avgNote >= 7);
    filteredCourses.sort((a, b) => b.avgNote - a.avgNote);

    reply.send(filteredCourses);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getCoursesByDateHandler = async (req: FastifyRequest<{ Querystring: GetCoursesByDateQuery }>, reply: FastifyReply) => {
  try {
    const { dateOption } = req.query;
    let startDate: Date;
    let endDate: Date = new Date();

    switch (dateOption) {
      case 'today':
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'nextTwoDays':
        startDate = new Date();
        endDate.setDate(endDate.getDate() + 2);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'previous':
        startDate = new Date(0);
        endDate.setHours(0, 0, 0, 0);
        break;
      default:
        reply.status(400).send({ message: 'Invalid date option' });
        return;
    }

    const courses = await Course.find({
      date: {
        $gte: startDate.toISOString(),
        $lte: endDate.toISOString(),
      },
    }).populate('by members');

    const coursesWithAvgNote = courses.map((course) => ({
      ...course.toObject(),
      avgNote: calculateAvgNote(course)
    }));

    reply.send(coursesWithAvgNote);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getCoursesHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const courses = await Course.find().populate('by members');
    const coursesWithAvgNote = courses.map((course) => ({
      ...course.toObject(),
      avgNote: calculateAvgNote(course)
    }));
    reply.send(coursesWithAvgNote);
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
    reply.send({
      ...course.toObject(),
      avgNote: calculateAvgNote(course)
    });
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
    reply.send({
      ...course.toObject(),
      avgNote: calculateAvgNote(course)
    });
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
