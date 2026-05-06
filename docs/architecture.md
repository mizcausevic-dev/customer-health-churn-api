# Customer Health & Churn API Architecture

## Service Overview

Customer Health & Churn API models an internal retention intelligence service used by customer success, product, support, and revenue teams to identify at-risk accounts and prioritize intervention.

It centralizes:

- customer and subscription context
- product usage trends
- support and sentiment signals
- renewal timing posture
- playbook routing

## Request Flow

1. A customer health scenario is submitted to an analysis endpoint.
2. The request body is validated with Zod.
3. The health service compares usage, feature adoption, support pressure, sentiment, renewal timing, and executive engagement.
4. The service returns issues, passed checks, a health status, and recommended action.
5. Teams use dashboard, renewal, and playbook endpoints for ongoing retention planning.

## Endpoint Map

- `GET /health`
- `GET /api/customers`
- `GET /api/customers/:id`
- `GET /api/subscriptions`
- `GET /api/usage`
- `GET /api/renewals`
- `GET /api/playbooks`
- `GET /api/dashboard/summary`
- `POST /api/analyze/health`
- `POST /api/analyze/churn`
- `POST /api/analyze/playbook`

## Health Scoring Model

### Retention Review

The health workflow scores:

- monthly usage decline
- feature adoption
- open critical support volume
- customer sentiment / NPS
- days until renewal
- executive sponsor engagement

### Playbook Routing

Playbook output prioritizes:

- recovery plans for usage and support deterioration
- expansion motions for strong adoption and sponsor engagement
- adoption acceleration for mixed-signal accounts

## Security Notes

- Requests are validated before service logic runs.
- Configuration remains environment-driven.
- Error responses are centralized and consistent.
- CI, Dependabot, and CodeQL support ongoing hygiene.

## Future Production Upgrades

- persist account signals in PostgreSQL
- connect CRM and support data sources
- add cohort-level health trending over time
- integrate renewal forecasting and expansion scoring
- support alerting and owner assignment workflows
