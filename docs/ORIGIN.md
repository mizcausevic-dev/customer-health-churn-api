# Why We Built This

**customer-health-churn-api** grew out of repeated work around healthcare operations, where the hardest problems were rarely about raw data collection. The real challenge was turning scattered evidence into something humans could govern quickly.

The recurring pressure in this space showed up around handoff friction, queue pressure, and weak visibility into follow-up ownership across patient journeys. In practice, that meant teams could collect logs, metrics, workflow state, documents, or events and still not have a good answer to the hardest questions: what is drifting, what matters first, who owns the next move, and what evidence supports that move? Once a system reaches that point, the problem is no longer only technical. It becomes operational.

That is why **customer-health-churn-api** was built the way it was. The repo is a deliberate attempt to model a real operating layer for care coordination, operations, and digital health teams. It is not just trying to present data attractively or prove that a stack can be wired together. It is trying to show what happens when evidence, prioritization, and next-best action are treated as first-class product concerns.

The surrounding tooling was not useless. EHR workflows, outreach tools, and reporting dashboards each handled a slice of the work. But they still left out a clear operating surface for pathway pressure, next-best action, and accountable follow-through. That gap kept turning ordinary review work into detective work.

That shaped the design philosophy:

- **operator-first** so the riskiest or most time-sensitive signal is surfaced early
- **decision-legible** so the logic behind a recommendation can be understood by humans under pressure
- **review-friendly** so the repo supports discussion, governance, and iteration instead of hiding the reasoning
- **CI-native** so checks and narratives can live close to the build and change process

This repo also avoids trying to be a vague platform for everything. Its value comes from being opinionated about a real problem: TypeScript customer success portfolio project demonstrating SaaS health scoring, churn-risk analysis, renewal prioritization, and playbook routing across product, support, and revenue signals.

What comes next is practical. The roadmap is about closed-loop outcome reporting, stronger throughput analytics, and deeper handoff evidence. The point of the repo is to turn that messy middle layer into something teams can actually work with.