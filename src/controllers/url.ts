import { Request, Response } from "express";

class UrlController {

  public createShortUrl(req: Request, res: Response): void {
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: 'URL is required' });
      return;
    }

    // TODO: Create short URL
    res.json({url: 'shortURL'});
  }


  public redirectToOriginalUrl(req: Request, res: Response): void {
    const { shortUrl } = req.params;

    // TODO: Retrieve long URL from db and redirect
    res.redirect("longUrl");
  }

  public getUrlStats(req: Request, res: Response): void {
    const { shortUrl } = req.params;

    // TODO: Retrieve click count and long URL from DB
    res.json({ longUrl: 'longUrl', clicks: 'clicks' });
  }
}

export default new UrlController();
