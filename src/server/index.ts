import express, { Request, Response } from "express";
import next from "next";
import { parse } from "url";
import { ParsedUrlQuery } from "querystring";

const route = require("path-match")();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const authMiddleware = (req, res, next) => {
  if (false) return res.redirect("/login");
  next();
};

(async () => {
  try {
    await app.prepare();
    const server = express();

    server.get("/about", authMiddleware, (req: Request, res: Response) => {
      let params: ParsedUrlQuery = route("/album")(parse(req.url).query);
      return app.render(req, res, "/about", params);
    });
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
