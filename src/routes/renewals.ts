import { Router } from "express";
import { renewals } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(renewals);
});

export default router;
