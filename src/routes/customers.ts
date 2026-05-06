import { Router } from "express";
import { customers } from "../data.js";
import { HttpError } from "../middleware/errorHandler.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(customers);
});

router.get("/:id", (request, response, next) => {
  const customer = customers.find((entry) => entry.id === request.params.id);

  if (!customer) {
    next(new HttpError(404, `Customer not found: ${request.params.id}`));
    return;
  }

  response.json(customer);
});

export default router;
