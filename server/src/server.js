/* Node.js libraries */
import path from "path";

/* External libraries */
import express from "express";
import morgan from "morgan";
import cors from "cors";
import checkJwt from "express-jwt"; // Validates access tokens automatically

/* Local files */
import postRoutes from "./routes/wishes.js";
import { createUsersRouter } from "./routes/users.js";

function createServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());


  app.use(express.static(path.resolve("..", "client", "build")));
  const openPaths = [
    { url: "/api/users/authenticate", methods: ["POST"] },
    /^(?!\/api).*/gim,

    { url: /\/api\/questions\.*/gim, methods: ["GET"] },
    { url: /\.*/gim, methods: ["GET"] },
    { url: /\/api\/allWishes\.*/gim, methods: ["GET"] },
    { url: /\/api\/users\/registration\.*/gim, methods: ["POST"] },
  ];
  const secret = process.env.SECRET || "the cake is a lie";
  app.use(
    checkJwt({ secret, algorithms: ["HS512"] }).unless({ path: openPaths })
  );

  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {

      res.status(401).json({ error: err.message });
    } else {
      next();
    }
  });

  const usersRouter = createUsersRouter(secret);



  app.use("/api/users", usersRouter);
  app.use("/api/allWishes", postRoutes);



  app.get("*", (req, res) =>
    res.sendFile(path.resolve("..", "client", "build", "index.html"))
  );

  return app;
}

export default createServer;
