import os
import shutil

# Define the project structure
project_name = "Backend"
folders = [
    "Backend/src/models",
    "Backend/src/routes",
    "Backend/src/controllers",
    "Backend/src/services",
    "Backend/src/plugins",
    "Backend/src/utils",
    "Backend/src/config",
]

files_content = {
    # Configuration Files
    "Backend/package.json": """
{
  "name": "backend",
  "version": "1.0.0",
  "description": "A simple backend project using Fastify, Mongoose, and TypeScript",
  "main": "src/index.ts",
  "scripts": {
    "start": "tsc && node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc"
  },
  "dependencies": {
    "fastify": "^4.0.0",
    "mongoose": "^7.0.0",
    "uuid": "^9.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@types/mongoose": "^5.11.97",
    "@types/node": "^20.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
""",
    "Backend/tsconfig.json": """
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
""",
    "Backend/.env": """
MONGO_URI=mongodb://localhost:27017/my_database
PORT=3000
""",
    "Backend/.gitignore": """
node_modules/
dist/
.env
""",
    
    # Main Application Entry
    "Backend/src/index.ts": """
import Fastify from 'fastify';
import mongoose from 'mongoose';
import registerRoutes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  const app = Fastify();
  const PORT = process.env.PORT || 3000;

  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🚀 MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }

  registerRoutes(app);

  try {
    await app.listen({ port: Number(PORT) });
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
};

startServer();
""",
    
    # Routes
    "Backend/src/routes/index.ts": """
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
""",

    # Controllers
    "Backend/src/controllers/UserController.ts": """
import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../models/User';

export const createUserHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = new User(req.body);
    await user.save();
    reply.status(201).send(user);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getUsersHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (err) {
    reply.status(500).send(err);
  }
};
""",
    "Backend/src/controllers/CourseController.ts": """
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

export const getCourseByIdHandler = async (req: FastifyRequest, reply: FastifyReply) => {
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

export const updateCourseHandler = async (req: FastifyRequest, reply: FastifyReply) => {
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

export const deleteCourseHandler = async (req: FastifyRequest, reply: FastifyReply) => {
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
""",
    "Backend/src/controllers/CreatorController.ts": """
import { FastifyReply, FastifyRequest } from 'fastify';
import Creator from '../models/Creator';

export const createCreatorHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const creator = new Creator(req.body);
    await creator.save();
    reply.status(201).send(creator);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getCreatorsHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const creators = await Creator.find();
    reply.send(creators);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getCreatorByIdHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const creator = await Creator.findById(req.params.id);
    if (!creator) {
      reply.status(404).send({ message: 'Creator not found' });
      return;
    }
    reply.send(creator);
  } catch (err) {
    reply.status(500).send(err);
  }
};
""",

    # Models
    "Backend/src/models/User.ts": """
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
""",
    "Backend/src/models/Course.ts": """
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ICourse extends Document {
  _id: string;
  Title: string;
  date: string;
  status: boolean;
  location: { lat: number; long: number };
  by: mongoose.Schema.Types.ObjectId;
  members: mongoose.Schema.Types.ObjectId[];
  note: { note: number; by: string; comment: string }[];
  price: number;
}

const CourseSchema: Schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    Title: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: Boolean, default: false },
    location: { 
      lat: { type: Number, required: true },
      long: { type: Number, required: true }
    },
    by: { type: Schema.Types.ObjectId, ref: 'Creator' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    note: [{ note: Number, by: String, comment: String }],
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', CourseSchema);
"""
}

# Create project structure
def create_project_structure():
    if os.path.exists(project_name):
        shutil.rmtree(project_name)  # Remove existing project directory
    os.makedirs(project_name)

    # Create folders
    for folder in folders:
        os.makedirs(os.path.join(project_name, folder), exist_ok=True)

    # Create files and write content
    for file_path, content in files_content.items():
        with open(os.path.join(project_name, file_path), 'w') as file:
            file.write(content)

create_project_structure()
