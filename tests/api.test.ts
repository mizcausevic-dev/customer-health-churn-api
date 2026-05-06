import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /health returns 200", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "Customer Health & Churn API");
});

test("GET /api/customers returns an array", async () => {
  const response = await request(app).get("/api/customers");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length >= 1);
});

test("POST /api/analyze/health returns score and status", async () => {
  const response = await request(app).post("/api/analyze/health").send({
    customerName: "Northstar Cloud",
    planType: "enterprise",
    monthlyActiveUsers: 184,
    previousMonthlyActiveUsers: 241,
    featureAdoptionRate: 0.46,
    openCriticalTickets: 2,
    nps: 21,
    daysUntilRenewal: 47,
    executiveEngagement: "low",
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.score, "number");
  assert.equal(typeof response.body.status, "string");
});

test("GET /api/renewals returns an array", async () => {
  const response = await request(app).get("/api/renewals");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});

test("POST /api/analyze/playbook returns recommended next-step output", async () => {
  const response = await request(app).post("/api/analyze/playbook").send({
    customerName: "Northstar Cloud",
    planType: "enterprise",
    monthlyActiveUsers: 184,
    previousMonthlyActiveUsers: 241,
    featureAdoptionRate: 0.46,
    openCriticalTickets: 2,
    nps: 21,
    daysUntilRenewal: 47,
    executiveEngagement: "low",
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.playbook, "string");
  assert.equal(typeof response.body.recommendedNextAction, "string");
});
