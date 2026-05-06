import { Router } from "express";
import { z } from "zod";
import {
  analyzeChurn,
  analyzeHealth,
  analyzePlaybook,
} from "../services/healthService.js";

const router = Router();

const analysisSchema = z.object({
  customerName: z.string().min(2),
  planType: z.enum(["growth", "enterprise", "strategic"]),
  monthlyActiveUsers: z.number().nonnegative(),
  previousMonthlyActiveUsers: z.number().nonnegative(),
  featureAdoptionRate: z.number().min(0).max(1),
  openCriticalTickets: z.number().int().nonnegative(),
  nps: z.number().min(-100).max(100),
  daysUntilRenewal: z.number().int().nonnegative(),
  executiveEngagement: z.enum(["high", "medium", "low"]),
});

router.post("/analyze/health", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeHealth(input));
});

router.post("/analyze/churn", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeChurn(input));
});

router.post("/analyze/playbook", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzePlaybook(input));
});

export default router;
