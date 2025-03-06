import { Router } from "express";
import UrlController from "../controllers/url";

const router = Router();

// Create a short URL from a long URL
router.post("/", UrlController.createShortUrl);

// Given a short URL, redirect to the original URL
router.get("/:shortUrl", UrlController.redirectToOriginalUrl);

// GET info about the short URL such as click count and long url
router.get("/stats/:shortUrl", UrlController.getUrlStats);


export default router;
