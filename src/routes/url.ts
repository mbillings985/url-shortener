import { Router } from "express";
import UrlController from "../controllers/url";

const router = Router();

router.get("/", UrlController.helloWorld);

export default router;
