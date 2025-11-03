import Fastify from 'fastify';
import rootRoute from './routes/root';
import dotenv from 'dotenv';
import userRoutes from './routes/users';

dotenv.config();
const app = Fastify({logger: true});

app.register(rootRoute);
app.register(userRoutes);

const start = async () => {
    try {
        await app.listen({port: 3000});
        console.log("server running at 3000");
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();