import { FastifyInstance } from "fastify";
import { getAllUsers } from "../models/user";


export default async function userRoutes(app:FastifyInstance) {
    app.get('/users', async (request, reply) => {
        try {
            const users = await getAllUsers();
            return {users};
        } catch (err) {
            app.log.error(err);
            reply.status(500).send({error: "failed to fetch users"});
        }
    })
}