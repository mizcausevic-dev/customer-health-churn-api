import { Router } from "express";
import { usageMetrics } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(usageMetrics);
});

export default router;
