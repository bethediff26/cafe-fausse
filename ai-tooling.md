# AI Tooling & Engineering Report

## Executive Summary

This document summarizes the AI-assisted software engineering workflow used during the development of the **Café Fausse** web application. Development leveraged local language models alongside automated CLI orchestration to drive rapid feature development, maintain strict software requirement specification (SRS) compliance, and achieve high code quality with zero API cost.

## 🛠️ AI Tooling & Architecture

* **Local Language Models:** Qwen 2.5 / 3.5 / 3.6 35B Mixture-of-Experts (MoE) hosted via **Ollama**.
* **CLI Bridge & Pair Programmer:** **Claude Code CLI** integrated locally into the workspace environment.
* **Primary Role:** Intelligent code pairing, automated SRS static analysis, regex rule generation, and non-functional requirement (NFR) checking.

## 🟢 What Worked Well

1. **Zero Cloud API Cost & Complete Data Privacy:**
   Running local LLMs (Qwen MoE series via Ollama) removed third-party cloud telemetry and API costs completely while maintaining low latency during iterative pair programming sessions.

2. **Rapid UI & Schema Scaffolding:**
   Accelerated initial frontend layout (React component modularity, Lightbox implementation) and synchronized backend database schema designs for customer reservations and newsletter persistence.

3. **Automated SRS Compliance & Quality Auditing:**
   Used AI pairing to run static code checks against all 18 functional requirements, enforcing strict email validation regex rules, checking dead code, and target bundle optimization under 300ms.

## 🟡 Challenges & Lessons Learned

1. **Local Model Token Limits & Prompt Chunking:**
   Because models were executed locally via Ollama, context window and token output constraints occasionally caused long or multi-file prompts to truncate. To overcome this, complex tasks (such as end-to-end full-stack feature implementations) were broken down into smaller, modular prompts—focusing first on schema design, then backend route logic, and finally UI component rendering.

2. **Handling Unused Imports & Fragmented Code:**
   Iterative AI generation occasionally produced redundant imports or temporary code fragments. This was mitigated by configuring automated ESLint passes and static script audits before committing changes.

3. **Database Persistence Verification:**
   Early iterations occasionally relied on client-side state fallbacks. Explicit prompt rules were created to guarantee full REST API-to-PostgreSQL database persistence for both the reservation system and newsletter subscriptions.

## 💡 Conclusion

The AI-assisted development workflow operated as a powerful force multiplier. By combining systematic human oversight with local LLM pair programming, full-stack application delivery was achieved with high architectural consistency and strict requirement compliance.