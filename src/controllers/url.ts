import { Request, Response } from "express";
import UrlService from "../services/urlService";
import Url from "../models/url";

class UrlController {
  public async createShortUrl(req: Request, res: Response): Promise<void> {
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: "URL is required" });
      return;
    }

    const existingUrl = await Url.findOne({ where: { longUrl: url } });
    if (existingUrl) {
      res.json({ url: existingUrl.shortUrl });
      return;
    }

    const shortUrl = UrlService.generateShortUrl();
    await Url.create({ shortUrl, longUrl: url }); // Save to DB

    res.json({ url: shortUrl });
  }

  public async redirectToLongUrl(req: Request, res: Response): Promise<void> {
    const { shortUrl } = req.params;

    const data = await Url.findByPk(shortUrl);
    if (!data) {
      res.status(404).json({ error: "Short URL not found" });
      return;
    }
    data.clicks += 1;
    await data.save();

    res.redirect(data.longUrl);
  }

  public async getUrlStats(req: Request, res: Response): Promise<void> {
    const { shortUrl } = req.params;

    const data = await Url.findByPk(shortUrl);
    if (!data) {
      res.status(404).json({ error: "Short URL not found" });
      return;
    }

    res.json({ longUrl: data.longUrl, clicks: data.clicks });
  }
}

export default new UrlController();
