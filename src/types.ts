export type HealthStatus = "healthy" | "watch" | "at-risk";
export type RenewalLikelihood = "expansion" | "stable" | "contraction-risk";

export interface Customer {
  id: string;
  name: string;
  segment: string;
  planType: "growth" | "enterprise" | "strategic";
  industry: string;
  ownerTeam: string;
  annualContractValue: number;
}

export interface Subscription {
  id: string;
  customerId: string;
  planType: "growth" | "enterprise" | "strategic";
  seats: number;
  renewalDate: string;
  autoRenew: boolean;
  expansionPotential: boolean;
}

export interface UsageMetric {
  id: string;
  customerId: string;
  monthlyActiveUsers: number;
  previousMonthlyActiveUsers: number;
  featureAdoptionRate: number;
  workspaceCoverage: number;
  loginFrequency: number;
}

export interface SupportSignal {
  id: string;
  customerId: string;
  openCriticalTickets: number;
  escalationsLast90Days: number;
  nps: number;
  executiveEngagement: "high" | "medium" | "low";
}

export interface Renewal {
  id: string;
  customerId: string;
  daysUntilRenewal: number;
  amountAtRenewal: number;
  likelihood: RenewalLikelihood;
}

export interface SuccessPlaybook {
  id: string;
  title: string;
  trigger: string;
  recommendedAction: string;
}

export interface HealthAnalysisInput {
  customerName: string;
  planType: "growth" | "enterprise" | "strategic";
  monthlyActiveUsers: number;
  previousMonthlyActiveUsers: number;
  featureAdoptionRate: number;
  openCriticalTickets: number;
  nps: number;
  daysUntilRenewal: number;
  executiveEngagement: "high" | "medium" | "low";
}

export interface AnalysisResponse {
  status: HealthStatus;
  score: number;
  issues: string[];
  passedChecks: string[];
  recommendedNextAction: string;
}

export interface PlaybookResponse {
  priority: "medium" | "high" | "critical";
  playbook: string;
  rationale: string[];
  recommendedNextAction: string;
}
