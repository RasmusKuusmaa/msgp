import { error } from "console";
import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function authenticate (
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return reply.status(401).send({error: "No token provided"});
        }

        const token = authHeader.substring(7);

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (request as any).user = decoded;
    } catch  (err) {
        return reply.status(401).send({error: "invalid or expired token"});
    }
}