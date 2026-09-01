---
date: "Feb 2024 - Present"
title: "Lumin Web PDF"
slug: "lumin-web-pdf"
description: "Lumin Web PDF is the in-app editor at the heart of Lumin — a SaaS PDF platform serving 100M+ users worldwide. As a developer on the In-App PDF Editor squad, I build and maintain the core features people use every day: annotate, e-sign, edit text, OCR, organize and AI-powered document tools, built with Next.js on top of NestJS services communicating over gRPC."
type: "company"
previewLink: "https://www.luminpdf.com/app/pdf"
imageSrc: "/images/projects/lumin-web-pdf.png"
ranking: 10
tech:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "NestJS"
  - "gRPC"
  - "MongoDB"
  - "RabbitMQ"
  - "AWS Lambda"
  - "AWS S3"
  - "AWS SQS"
  - "PDF SDK"
  - "Micro-frontend"
tools:
  - "GitHub"
  - "Linear"
  - "Notion"
  - "Figma"
  - "Datadog"
  - "Jira"
  - "AI Coding Agents"
---

## KEY FEATURES & TECHNOLOGIES

- **Core Editing Suite**: Built and maintained the features users interact with daily — **annotate**, **e-sign**, **edit text**, **OCR**, **merge/rotate** and **AI-powered document tools**.

- **Architecture**: A **Next.js** front end backed by **NestJS** services communicating over **gRPC**, with **MongoDB**, **RabbitMQ** for event-driven processing and **AWS** (Lambda, S3, SQS) underneath.

- **AI Document Tools**: Shipped AI-assisted document capabilities directly into the editor, bringing conversational and automated workflows to documents users already work with.

  ![AI-powered document tools in the Lumin editor](/images/projects/lumin-web-pdf-ai-agent.png)

- **Scale**: Every feature ships to a platform used by **100M+ users**, so performance, reliability and backwards compatibility are first-class constraints rather than afterthoughts.

## ACHIEVEMENTS & MILESTONES

### ✍️ Lumin Sign Integration — ~$29,500 in Deals

- **Developer in charge** of the **PDF × Lumin Sign** integration: creating signature fields on PDFs and handing off cleanly to Lumin Sign for the signing flow.
- Positioned Lumin as a direct alternative to **DocuSign**, and the capability helped **win multiple deals worth an estimated $29,500**.

  ![PDF and Lumin Sign integration](/images/projects/lumin-web-pdf-x-sign.png)

- Required careful coordination between the editor's document model and the signing service so that fields created in the PDF survive the hand-off intact.

### 🗂️ Rebuilt PDF Actions — ~$16,000 Deal

- **Rebuilt the layout and flow of PDF actions** (merge, rotate, organize and related operations), turning a scattered set of operations into one coherent, predictable flow.
- **Tailored the experience for a financial-services customer**, directly supporting a deal worth **~$16,000**.

  ![Rebuilt PDF organize and actions flow](/images/projects/lumin-web-pdf-organize.png)

### 💰 In-House PDF SDK Migration — Est. ~$5M Saving

- Contributed **feature mapping and migration support** for moving off a **third-party PDF engine** onto **Lumin's in-house PDF SDK**.
- An initiative estimated to save the client **~$5 million**.
- The hard part was parity: auditing every editor behaviour that depended on the old engine and making sure the replacement matched it before switching users over.

### 🤖 The "AI Migration" — Largest Campaign in Company History

- **Core contributor** to the **"AI Migration"** — the largest campaign in **Designveloper's** history, delivered in just **2 weeks**:
  - Consolidated **per-team repositories into a single codebase**
  - Moved **Bitbucket → GitHub** and **Jira/Confluence → Linear/Notion**
  - **Embedded AI tooling** directly into the day-to-day development workflow
- The payoff was immediate and measurable: a feature **previously estimated at ~1 year to ship was delivered in 2 weeks** afterwards.

### 🎉 Part of a 100 Million User Platform

- The editor features I own are used daily across a platform that has grown past **100 million users** worldwide.

## TECHNICAL CHALLENGES

- **Cross-service communication**: Keeping a Next.js front end responsive while orchestrating **gRPC** calls across multiple NestJS services, with **RabbitMQ** handling the long-running document jobs.
- **PDF performance at scale**: Rendering, OCR and large-document handling had to stay fast in the browser for documents of wildly varying size and quality.
- **Migrating without regressions**: Swapping the underlying PDF engine beneath features that millions of people use every day meant behaviour-level parity mattered more than code-level equivalence.

## SUMMARY

Lumin Web PDF is the product surface where my work is most visible: the **daily editor** for a **100M+ user** platform. Beyond shipping core features, the work has been consistently tied to **business outcomes** — **~$29,500** in deals from the Lumin Sign integration, a **~$16,000** deal supported by the rebuilt PDF actions flow, and an estimated **~$5M** saving from the in-house SDK migration — while the **AI Migration** reshaped how the whole team ships software.
