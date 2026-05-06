import { customers, playbooks, renewals, subscriptions, supportSignals, usageMetrics } from "../data.js";
import type {
  AnalysisResponse,
  HealthAnalysisInput,
  HealthStatus,
  PlaybookResponse,
} from "../types.js";

function statusFromScore(score: number): HealthStatus {
  if (score < 55) {
    return "at-risk";
  }

  if (score < 85) {
    return "watch";
  }

  return "healthy";
}

export function analyzeHealth(input: HealthAnalysisInput): AnalysisResponse {
  const issues: string[] = [];
  const passedChecks: string[] = [];
  let score = 100;

  const usageDeclinePct =
    input.previousMonthlyActiveUsers === 0
      ? 0
      : ((input.previousMonthlyActiveUsers - input.monthlyActiveUsers) /
          input.previousMonthlyActiveUsers) *
        100;

  if (usageDeclinePct > 15) {
    issues.push("Monthly active usage has declined materially.");
    score -= 18;
  } else {
    passedChecks.push("Usage trend does not show severe contraction.");
  }

  if (input.featureAdoptionRate < 0.55) {
    issues.push("Feature adoption is below target for this account tier.");
    score -= 16;
  } else {
    passedChecks.push("Feature adoption clears the modeled threshold.");
  }

  if (input.openCriticalTickets >= 2) {
    issues.push("Critical support volume increases churn probability near renewal.");
    score -= 17;
  } else {
    passedChecks.push("Critical support posture is within expected range.");
  }

  if (input.nps < 30) {
    issues.push("Customer sentiment is below the healthy NPS range.");
    score -= 12;
  } else {
    passedChecks.push("Customer sentiment is acceptable for retention planning.");
  }

  if (input.daysUntilRenewal < 60) {
    issues.push("Renewal window is approaching and limits intervention time.");
    score -= 10;
    passedChecks.push("Renewal window is still actionable for intervention.");
  } else {
    passedChecks.push("Renewal window provides enough room for proactive action.");
  }

  if (input.executiveEngagement === "low") {
    issues.push("Executive sponsor engagement is low.");
    score -= 15;
  } else {
    passedChecks.push("Executive engagement is not currently a primary risk.");
  }

  if (input.planType === "enterprise" || input.planType === "strategic") {
    passedChecks.push("Account remains on a strategic plan tier.");
  }

  const finalScore = Math.max(0, Math.round(score));
  const status = statusFromScore(finalScore);
  const recommendedNextAction =
    status === "healthy"
      ? "Continue routine success planning and monitor for expansion signals."
      : status === "watch"
        ? "Route to customer success for targeted adoption and sponsor-engagement follow-up."
        : "Escalate to customer success leadership and launch a 30-day recovery plan.";

  return {
    status,
    score: finalScore,
    issues,
    passedChecks,
    recommendedNextAction,
  };
}

export function analyzeChurn(input: HealthAnalysisInput): AnalysisResponse {
  return analyzeHealth(input);
}

export function analyzePlaybook(input: HealthAnalysisInput): PlaybookResponse {
  const rationale: string[] = [];
  let priority: PlaybookResponse["priority"] = "medium";
  let playbook = playbooks[2].title;

  const usageDeclinePct =
    input.previousMonthlyActiveUsers === 0
      ? 0
      : ((input.previousMonthlyActiveUsers - input.monthlyActiveUsers) /
          input.previousMonthlyActiveUsers) *
        100;

  if (
    usageDeclinePct > 15 &&
    input.openCriticalTickets >= 2 &&
    input.executiveEngagement === "low"
  ) {
    priority = "critical";
    playbook = playbooks[0].title;
    rationale.push("Usage decline, support friction, and low executive engagement create a high-risk renewal posture.");
  }

  if (
    input.featureAdoptionRate > 0.7 &&
    input.executiveEngagement === "high" &&
    (input.planType === "enterprise" || input.planType === "strategic")
  ) {
    priority = "high";
    playbook = playbooks[1].title;
    rationale.push("High adoption and strong sponsor engagement create a credible expansion path.");
  }

  if (rationale.length === 0) {
    rationale.push("The account shows mixed retention signals and needs focused adoption support.");
  }

  if (input.daysUntilRenewal < 60) {
    rationale.push("Near-term renewal timing raises the urgency of intervention.");
    if (priority === "medium") {
      priority = "high";
    }
  }

  const playbookEntry = playbooks.find((entry) => entry.title === playbook) ?? playbooks[2];

  return {
    priority,
    playbook,
    rationale,
    recommendedNextAction: playbookEntry.recommendedAction,
  };
}

export function getDashboardSummary() {
  const atRiskRenewals = renewals.filter(
    (renewal) => renewal.likelihood === "contraction-risk",
  ).length;
  const avgFeatureAdoption =
    usageMetrics.reduce((sum, metric) => sum + metric.featureAdoptionRate, 0) /
    usageMetrics.length;
  const lowEngagementAccounts = supportSignals.filter(
    (signal) => signal.executiveEngagement === "low",
  ).length;

  return {
    customerCount: customers.length,
    subscriptionCount: subscriptions.length,
    atRiskRenewals,
    averageFeatureAdoption: Number(avgFeatureAdoption.toFixed(2)),
    lowExecutiveEngagementAccounts: lowEngagementAccounts,
    topFocusAreas: [
      "Enterprise usage recovery before renewal",
      "Executive sponsor engagement",
      "Critical support stabilization",
    ],
  };
}
