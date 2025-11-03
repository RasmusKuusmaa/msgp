import {FastifyInstance} from 'fastify';

export default async function rootRoute(app: FastifyInstance) {
    app.get('/', async () => {
        return {message: "works"};
    });
}