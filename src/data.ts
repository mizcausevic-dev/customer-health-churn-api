import type {
  Customer,
  Renewal,
  Subscription,
  SuccessPlaybook,
  SupportSignal,
  UsageMetric,
} from "./types.js";

export const customers: Customer[] = [
  {
    id: "cust_01",
    name: "Northstar Cloud",
    segment: "Mid-market SaaS",
    planType: "enterprise",
    industry: "Cloud Infrastructure",
    ownerTeam: "Customer Success",
    annualContractValue: 240000,
  },
  {
    id: "cust_02",
    name: "SignalForge Security",
    segment: "Enterprise Security",
    planType: "strategic",
    industry: "Cybersecurity",
    ownerTeam: "Strategic Accounts",
    annualContractValue: 410000,
  },
  {
    id: "cust_03",
    name: "Atlas Analytics",
    segment: "Growth Data Platform",
    planType: "growth",
    industry: "Analytics",
    ownerTeam: "Scaled Success",
    annualContractValue: 96000,
  },
];

export const subscriptions: Subscription[] = [
  {
    id: "sub_01",
    customerId: "cust_01",
    planType: "enterprise",
    seats: 260,
    renewalDate: "2026-06-22T00:00:00.000Z",
    autoRenew: false,
    expansionPotential: false,
  },
  {
    id: "sub_02",
    customerId: "cust_02",
    planType: "strategic",
    seats: 480,
    renewalDate: "2026-09-18T00:00:00.000Z",
    autoRenew: false,
    expansionPotential: true,
  },
  {
    id: "sub_03",
    customerId: "cust_03",
    planType: "growth",
    seats: 95,
    renewalDate: "2026-07-30T00:00:00.000Z",
    autoRenew: true,
    expansionPotential: true,
  },
];

export const usageMetrics: UsageMetric[] = [
  {
    id: "usage_01",
    customerId: "cust_01",
    monthlyActiveUsers: 184,
    previousMonthlyActiveUsers: 241,
    featureAdoptionRate: 0.46,
    workspaceCoverage: 0.68,
    loginFrequency: 3.4,
  },
  {
    id: "usage_02",
    customerId: "cust_02",
    monthlyActiveUsers: 422,
    previousMonthlyActiveUsers: 401,
    featureAdoptionRate: 0.74,
    workspaceCoverage: 0.84,
    loginFrequency: 5.1,
  },
  {
    id: "usage_03",
    customerId: "cust_03",
    monthlyActiveUsers: 78,
    previousMonthlyActiveUsers: 72,
    featureAdoptionRate: 0.63,
    workspaceCoverage: 0.71,
    loginFrequency: 4.2,
  },
];

export const supportSignals: SupportSignal[] = [
  {
    id: "support_01",
    customerId: "cust_01",
    openCriticalTickets: 2,
    escalationsLast90Days: 3,
    nps: 21,
    executiveEngagement: "low",
  },
  {
    id: "support_02",
    customerId: "cust_02",
    openCriticalTickets: 0,
    escalationsLast90Days: 0,
    nps: 48,
    executiveEngagement: "high",
  },
  {
    id: "support_03",
    customerId: "cust_03",
    openCriticalTickets: 1,
    escalationsLast90Days: 1,
    nps: 36,
    executiveEngagement: "medium",
  },
];

export const renewals: Renewal[] = [
  {
    id: "renew_01",
    customerId: "cust_01",
    daysUntilRenewal: 47,
    amountAtRenewal: 240000,
    likelihood: "contraction-risk",
  },
  {
    id: "renew_02",
    customerId: "cust_02",
    daysUntilRenewal: 135,
    amountAtRenewal: 410000,
    likelihood: "expansion",
  },
  {
    id: "renew_03",
    customerId: "cust_03",
    daysUntilRenewal: 84,
    amountAtRenewal: 96000,
    likelihood: "stable",
  },
];

export const playbooks: SuccessPlaybook[] = [
  {
    id: "playbook_01",
    title: "30-day recovery plan",
    trigger: "Declining usage + critical support + low executive engagement",
    recommendedAction: "Escalate to CS leadership, launch executive outreach, and schedule workflow adoption review.",
  },
  {
    id: "playbook_02",
    title: "Expansion readiness",
    trigger: "High adoption + positive support posture + strategic plan",
    recommendedAction: "Route to growth CSM and account executive for expansion planning.",
  },
  {
    id: "playbook_03",
    title: "Adoption acceleration",
    trigger: "Moderate health with feature adoption gaps",
    recommendedAction: "Launch enablement workshops and product value review with champions.",
  },
];
