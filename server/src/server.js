/* Node.js libraries */
import path from "path";

/* External libraries */
import express from "express";
import morgan from "morgan";
import cors from "cors";
import checkJwt from "express-jwt"; // Validates access tokens automatically

/* Local files */
import postRoutes from "./routes/posts.js";
import { createUsersRouter } from "./routes/users.js";

function createServer() {
  const app = express();
  /* The cors() middleware allows Cross-Origin Resource Sharing when developing
     * locally: http://expressjs.com/en/resources/middleware/cors.html */
  app.use(cors());
  /* The express.json() middleware automatically parses JSON data in the body of
   * requests: http://expressjs.com/en/api.html#express.json */
  app.use(express.json());

  /* The express.urlencoded() middleware automatically parses urlencoded payloads
   * into the req.body property:
   * http://expressjs.com/en/api.html#express.urlencoded */
  //app.use(express.urlencoded({ extended: false }));

  /* The morgan() middleware logs request info to the console while the server is
   * running: https://expressjs.com/en/resources/middleware/morgan.html */
  //app.use(morgan("combined"));


  /* The express.static() middleware serves our static files from the pre-built
   * React app: http://expressjs.com/en/api.html#express.static */
  //app.use(express.static(path.resolve("..", "client", "build")));

  /* We add our own routes as middleware on the `/api` path */


  /* "Redirect" all non-API GET requests to React's entry point (index.html)
   * which allows the React SPA's client side navigation library to handle full
   * page refreshes */
  //app.use(express.static(path.resolve("..", "client", "build")));


  const openPaths = [
    // Open "/api/users/authenticate" for POST requests
    { url: "/api/users/authenticate", methods: ["POST"] },

    // Open everything that doesn't begin with "/api"
    /^(?!\/api).*/gim,

    // Open all GET requests on the form "/api/questions/*" using a regular expression
    { url: /\/api\/questions\.*/gim, methods: ["GET"] },
    { url: /\.*/gim, methods: ["GET"] },
    { url: /\/api\/allPosts\.*/gim, methods: ["GET"] },
    { url: /\/api\/users\/registration\.*/gim, methods: ["POST"] },
  ];
  const secret = process.env.SECRET || "the cake is a lie";
  app.use(
    checkJwt({ secret, algorithms: ["HS512"] }).unless({ path: openPaths })
  );

  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      // If the user didn't authorize correctly
      res.status(401).json({ error: err.message }); // Return 401 with error message.
    } else {
      next(); // If no errors, forward request to next middleware or route handler
    }
  });

  const usersRouter = createUsersRouter(secret);
  //const postsRouter = postRoutes();

  app.use("/api/users", usersRouter);
  app.use("/api/allPosts", postRoutes);

  // app.get("*", (req, res) =>
  //   res.sendFile(path.resolve("..", "client", "build", "index.html"))
  // );
  return app;
}

export default createServer;
