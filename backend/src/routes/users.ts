import { FastifyInstance } from "fastify";
import { getAllUsers, loginUser, registerUser } from "../models/user";
import { error } from "console";
import { request } from "http";

export default async function userRoutes(app: FastifyInstance) {
  app.get("/users", async (request, reply) => {
    try {
      const users = await getAllUsers();
      return { users };
    } catch (err) {
      app.log.error(err);
      reply.status(500).send({ error: "failed to fetch users" });
    }
  });

  app.post("/register", async (request, reply) => {
    try {
      const { userName, password } = request.body as {
        userName: string;
        password: string;
      };
      if (!userName || !password) {
        return reply.status(400).send({
          error: `both username and password are
                     required`,
        });
      }
      const result = await registerUser(userName, password);
      return result;
    } catch (err: any) {
      app.log.error(err);
      reply.status(500).send({ error: err.message });
    }
  });

  app.post("/login", async (request, reply) => {
    try {
      const { userName, password } = request.body as {
        userName: string;
        password: string;
      };
      if (!userName || !password) {
        return reply.status(400).send({ error: `empty data` });
      }
      const res = await loginUser(userName, password);
      return res;
    } catch (err: any) {
      app.log.error(err);
      reply.status(500).send({ error: err.message });
    }
  });
}
