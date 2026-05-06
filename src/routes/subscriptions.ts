import { Router } from "express";
import { subscriptions } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(subscriptions);
});

export default router;
