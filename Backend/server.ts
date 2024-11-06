
import Fastify from 'fastify';
import { plugins } from './src/config/plugins';
import { registerRoutes } from './src/routes';

const server = Fastify({ logger: true });

// Register plugins
plugins(server);

// Register routes
registerRoutes(server);

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log(`Server listening at http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
    