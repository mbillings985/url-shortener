import { Request, Response } from 'express';
import UrlController from '../controllers/url';
import Url from '../models/url';
import UrlService from '../services/urlService';
import { Sequelize } from 'sequelize-typescript';

jest.mock('../models/url');
jest.mock('../services/urlService');

describe('UrlController', () => {
  let mockedSequelize: Sequelize;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(async () => {
    mockedSequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [__dirname + "/src/models"],
      logging: false,
    });

    await mockedSequelize.sync({ force: true });

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {};
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await mockedSequelize.close();
  });

  describe('CreateShortUrl', () => {
    it('should return 400 if url is not provided', async () => {
      req.body = {};

      await UrlController.createShortUrl(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'URL is required' });
    });

    it('should return existing short URL if long URL already exists', async () => {
      req.body = { url: 'http://example.com' };
      const existingUrl = { shortUrl: 'abc123', longUrl: 'http://example.com' } as Url;

      jest.spyOn(Url, 'findOne').mockResolvedValueOnce(existingUrl);

      await UrlController.createShortUrl(req as Request, res as Response);
      
      expect(Url.findOne).toHaveBeenCalledTimes(1);
      expect(jsonMock).toHaveBeenCalledWith({ url: existingUrl.shortUrl });
    });

    it('should create a new short URL if long URL does not exist', async () => {
      req.body = { url: 'http://example.com' };
      const shortUrl = 'abc123';


      jest.spyOn(Url, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(UrlService, 'generateShortUrl').mockReturnValue(shortUrl);
      jest.spyOn(Url, 'create').mockResolvedValue({ shortUrl, longUrl: req.body.url });

      
      await UrlController.createShortUrl(req as Request, res as Response);

      expect(jsonMock).toHaveBeenCalledWith({ url: shortUrl });
    });
  });

  describe('redirectToLongUrl', () => {
    it('should return 404 if short URL does not exist', async () => {
      req.params = { shortUrl: 'nonexistent' };

      jest.spyOn(Url, 'findByPk').mockResolvedValueOnce(null);

      await UrlController.redirectToLongUrl(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Short URL not found' });
    });

    it('should redirect to the long URL if short URL exists', async () => {
      req.params = { shortUrl: 'abc123' };
      const mockUrl = { shortUrl: 'abc123', longUrl: 'http://example.com', clicks: 0, save: jest.fn() } as unknown as Url;
      
      jest.spyOn(Url, 'findByPk').mockResolvedValueOnce(mockUrl);

      const redirectMock = jest.fn();
      res.redirect = redirectMock;
      await UrlController.redirectToLongUrl(req as Request, res as Response);

      expect(redirectMock).toHaveBeenCalledWith(mockUrl.longUrl);
      expect(mockUrl.save).toHaveBeenCalled();
    });
  });

  describe('getUrlStats', () => {
    it('should return 404 if short URL does not exist', async () => {
      req.params = { shortUrl: 'nonexistent' };

      jest.spyOn(Url, 'findByPk').mockResolvedValueOnce(null);
      
      await UrlController.getUrlStats(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Short URL not found' });
    });

    it('should return URL stats if short URL exists', async () => {
      req.params = { shortUrl: 'abc123' };
      const mockUrl = { shortUrl: 'abc123', longUrl: 'http://example.com', clicks: 5 } as Url;

      jest.spyOn(Url, 'findByPk').mockResolvedValueOnce(mockUrl);
    
      await UrlController.getUrlStats(req as Request, res as Response);
      expect(jsonMock).toHaveBeenCalledWith({ longUrl: mockUrl.longUrl, clicks: mockUrl.clicks });
    });
  });
});