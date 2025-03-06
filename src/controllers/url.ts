import { Request, Response } from "express";

class UrlController {
  public helloWorld(req: Request, res: Response): void {
    res.send("Hello World");
  }
}

export default new UrlController();
