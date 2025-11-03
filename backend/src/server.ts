import Fastify from 'fastify';
import rootRoute from './routes/root';

const app = Fastify({logger: true});

app.register(rootRoute);

const start = async () => {
    try {
        await app.listen({port: 3000});
        console.log("server running at 3000");
    }
    catch (err) {
        app.log(err);
        process.exit(1);
    }
};

start();