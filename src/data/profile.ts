/**
 * All site content lives in this file. Edit it to update the site; no component changes needed.
 *
 * Every placeholder is marked with "TODO:" so you can search for them.
 * Missing optional values (links, dates, photo) are simply not rendered in production;
 * in `npm run dev` they show up as dashed TODO badges on the page.
 *
 * Privacy: do NOT add a phone number here. Everything in this file is published.
 */
import type {
  Achievement,
  Certification,
  Education,
  Profile,
  Project,
  Role,
  SkillGroup,
} from "./types";

export const profile: Profile = {
  name: "Amreen Kaur Bhatia",
  headline: "Security Engineer & AI Software Engineer",
  location: "Newark, NJ",
  email: "amreen.bhatia9595@gmail.com",
  intro:
    "Security+ certified engineer studying Computer Science & Cybersecurity at NJIT. I build detection and response automation in Splunk SIEM and SOAR, ML anomaly detection pipelines, and AI agents and full-stack LLM applications with guardrails that keep their output trustworthy.",
  typing: {
    all: ["Detection Engineering", "AI Agents & LLM Apps", "Secure Full-Stack Apps", "SOAR Automation", "ML Anomaly Detection", "AI Security Guardrails"],
    security: ["Detection Engineering", "Threat Hunting", "Incident Response", "SOAR Automation", "Application Security", "ML Anomaly Detection", "AI Security"],
    swe: ["Full-Stack AI Apps", "AI Agents (Google ADK)", "LLM Applications", "Machine Learning", "Guardrails & Verification", "Workflow Automation"],
  },
  // TODO: Review the About text and rewrite it in your own voice. It is built only from resume facts.
  about: [
    "I work where security operations meet software engineering. As a Level 2 SOC Analyst with TekStream Solutions and NJIT, I triage 100+ alerts a day in Splunk SIEM, and I automate the repetitive parts: SOAR workflows that cut response times by 35%.",
    "Security shapes how I build AI applications. On the Client Intelligence Dashboard at World Wide Technology, I engineered prompt-level guardrails to block sensitive metadata leakage and a verification pipeline (SEC EDGAR retrieval, source validation, trusted-domain filtering) to reduce LLM hallucinations. On ReviewLens AI, a multi-user review-intelligence app built with a team of five, I treated LLM context as a security boundary: model input is scoped to each user's own dataset, and per-user data isolation is enforced with ownership checks and negative tests.",
    "Engineering shapes how I defend: enrichment pipelines (VirusTotal, AbuseIPDB, Spur, WHOIS) instead of manual lookups, documented runbooks that make incident response consistent and repeatable, and, at NJIT, ML anomaly detection pipelines trained on 500K+ row log datasets that flag fraud and threats with 85% accuracy.",
    "I'm completing a combined B.S./M.S. in Computer Science & Cybersecurity and Privacy at NJIT (expected May 2027) and working toward the NVIDIA Certified Professional – Agentic AI certification.",
  ],
  // TODO: Add a photo (e.g. put photo.jpg in /public and set photo: "/photo.jpg"). Optional.
  photo: undefined,
  links: {
    github: "https://github.com/amreenbhatia1",
    linkedin: "https://www.linkedin.com/in/amreen-kaur-bhatia",
    // TODO: Optional personal website/blog URL.
    website: undefined,
  },
};

export const experience: Role[] = [
  {
    company: "World Wide Technology",
    title: "Solutions, Consulting & Engineering Intern",
    location: "New York City, NY",
    start: "May 2026",
    end: "August 2026",
    focus: "both",
    tags: ["Security Operations", "Vulnerability Management", "Incident Response", "Compliance"],
    bullets: [
      {
        text: "Supported security operations by monitoring and triaging 200+ security alerts, analyzing suspicious events and assisting in investigations",
        swe: "Triaged and analyzed 200+ security alerts, investigating suspicious events across enterprise systems",
      },
      {
        text: "Developed 20+ vulnerability and patch management audit reports highlighting remediation process, residual risks, and audit closure status",
        swe: "Authored 20+ audit reports and delivered 3+ stakeholder presentations, communicating findings clearly",
      },
      {
        text: "Delivered 3+ stakeholder presentations communicating audit findings, remediation progress, and outstanding security risks",
        swe: null,
      },
      {
        text: "Conducted cybersecurity gap assessments against compliance requirements, producing remediation recommendations",
        swe: "Ran gap assessments and authored incident response runbooks to standardize and improve process reliability",
      },
      {
        text: "Authored incident response and cyber recovery runbooks to strengthen operational resilience, business continuity, and response consistency",
        swe: null,
      },
      {
        text: "Completed Cybersecurity Bootcamp focused on network security, ethical hacking, malware analysis, incident response, and CTFs",
        swe: null,
      },
    ],
  },
  {
    company: "TekStream Solutions & New Jersey Institute of Technology",
    title: "Level 2 Security Operations Center Analyst",
    location: "Newark, NJ",
    start: "June 2025",
    end: "Present",
    focus: "both",
    tags: ["Splunk SIEM", "SOAR", "Detection Engineering", "MITRE ATT&CK"],
    bullets: [
      {
        text: "Monitored and triaged 100+ daily security alerts in Splunk SIEM across Linux/Windows systems",
        swe: "Triaged 100+ daily alerts and tuned SIEM correlation searches across Linux/Windows, reducing false positives",
      },
      {
        text: "Performed log correlation, IOC enrichment, and MITRE ATT&CK-based threat classification to identify suspicious activity",
        swe: null,
      },
      {
        text: "Documented and escalated 120+ security incidents following SOC runbooks and NIST IR guidelines",
        swe: "Documented and escalated 120+ incidents following structured runbooks and NIST guidelines",
      },
      {
        text: "Collaborated with TekStream Solutions to improve detection engineering and reduce false positives",
        swe: "Collaborated cross-functionally with TekStream Solutions engineers on detection improvements",
      },
      {
        text: "Automated SOAR workflows to cut response times by 35%, reducing manual triage and improving incident accuracy",
        swe: "Automated multi-step security workflows (SOAR), cutting response times by 35% and reducing manual triage",
      },
    ],
  },
  {
    company: "New Jersey Institute of Technology",
    title: "Student Associate",
    location: "Newark, NJ",
    start: "Sept 2024",
    end: "Present",
    focus: "both",
    tags: ["Technical Support", "Event Operations"],
    bullets: [
      "Delivered operational and technical support for 20+ high-profile university events, ensuring smooth IT setup and system readiness",
      "Assisted 500+ students, visitors, and staff by resolving system, equipment, and logistical issues, demonstrating strong incident handling skills",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "ReviewLens AI: Review Intelligence Portal",
    context: "Team of 5",
    description:
      "A multi-user SaaS web app where analysts import Google Maps reviews and ask natural-language questions answered only from their own dataset.",
    bullets: [
      "Built a multi-user SaaS web app where analysts import Google Maps reviews via CSV and ask natural-language questions answered only from their own dataset, using React/TypeScript and a Python FastAPI backend",
      "Designed a PostgreSQL schema (Users, AnalysisTargets, IngestionRuns, Reviews) with foreign keys and version-controlled SQL migrations, plus a REST API for target management, review ingestion, and AI Q&A",
      "Secured the platform with Supabase Auth and backend-verified identity, enforcing per-user data isolation through ownership checks and negative tests for cross-user read, write, delete, and ingestion attempts",
      "Treated LLM context as a security boundary by scoping model input to the user's active dataset and using prompt-level guardrails to decline out-of-scope questions",
      "Validated and normalized untrusted CSV input, rejecting invalid records without fabricating data, and set up GitHub Actions CI (lint, build, tests) that blocks merges on failure, with API keys kept out of source control",
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL (Supabase)", "OpenAI API", "GitHub Actions"],
    tags: ["AI/LLM", "AI Security", "Full Stack", "AppSec"],
    focus: "both",
    order: { all: 1, security: 2, swe: 1 },
    date: "Fall 2026",
    // TODO: Add GitHub/demo links if they can be shared publicly.
    links: {},
  },
  {
    title: "Client Intelligence Dashboard (Collective)",
    context: "World Wide Technology internship capstone",
    description:
      "An AI client-intelligence dashboard with prompt-level guardrails and a source-verification pipeline that keep LLM output accurate and free of sensitive data.",
    bullets: [
      {
        text: "Engineered AI security guardrails enforcing prompt-level controls to prevent sensitive metadata leakage and unverified financial claims",
        swe: "Engineered LLM guardrails enforcing prompt-level controls to block sensitive metadata leakage and unverified outputs",
      },
      {
        text: "Built an AI verification pipeline using SEC EDGAR, client validation, and trusted domain filtering to reduce AI hallucinations",
        swe: "Built an AI verification pipeline (SEC EDGAR retrieval, source validation, trusted domain filtering) to reduce LLM hallucinations",
      },
    ],
    // TODO: Confirm/extend the tech stack (languages, frameworks, model provider).
    stack: ["LLMs", "SEC EDGAR"],
    tags: ["AI/LLM", "AI Security"],
    focus: "both",
    order: { all: 2, security: 1, swe: 3 },
    // TODO: Add project date, and GitHub/demo/writeup links if they can be shared publicly.
    date: undefined,
    links: {},
  },
  {
    title: "AI Agents Capstone Project",
    context: "Google x Kaggle",
    description: "An AI agent built with Google ADK that automates a multi-step analysis workflow end to end.",
    bullets: [
      {
        text: "Built an AI agent with Google ADK (agentic framework) to automate a multi-step analysis workflow end to end",
        security:
          "Built an AI agent using Google ADK to automate multi-step analysis workflows, applying concepts relevant to security automation",
      },
      {
        text: "Designed a Kaggle notebook implementing 10+ automated workflow steps, improving process efficiency by 40%",
        security:
          "Designed a Kaggle Notebook with 10+ automated workflow steps, demonstrating strong automation skills (improved efficiency by 40%)",
      },
    ],
    // TODO: Confirm/extend the tech stack (e.g. language, model).
    stack: ["Google ADK", "Kaggle Notebooks"],
    tags: ["AI/LLM", "Automation"],
    focus: "both",
    order: { all: 3, security: 3, swe: 2 },
    // TODO: Add project date and links (Kaggle notebook URL, GitHub repo, writeup).
    date: undefined,
    links: {},
  },
  {
    title: "SOAR Playbook Optimization",
    description:
      "Splunk SOAR playbooks that automate phishing triage, from IOC extraction and enrichment to containment and escalation.",
    bullets: [
      {
        text: "Developed and optimized Splunk SOAR playbooks to automate phishing triage, including IOC extraction and reputation checks",
        swe: "Developed and optimized automation playbooks orchestrating multi-step triage, IOC extraction, and reputation checks",
      },
      {
        text: "Reduced average response time by 35% through automated containment actions and streamlined escalation workflows",
        swe: "Reduced average response time by 35% through automated containment and streamlined escalation logic",
      },
      {
        text: "Integrated enrichment tools (VirusTotal, AbuseIPDB, Spur, WHOIS lookup) to reduce manual analyst effort by 30%",
        swe: "Integrated external enrichment services (VirusTotal, AbuseIPDB, Spur) into an automated pipeline, cutting manual effort by 30%",
      },
    ],
    stack: ["Splunk SOAR", "VirusTotal", "AbuseIPDB", "Spur", "WHOIS"],
    tags: ["SOAR", "Automation", "Detection"],
    focus: "both",
    order: { all: 4, security: 4, swe: 7 },
    // TODO: Add project date and links (sanitized playbook repo or writeup), if shareable.
    date: undefined,
    links: {},
  },
  {
    title: "Anomaly Detection & Data Security",
    context: "New Jersey Institute of Technology",
    description:
      "Machine learning pipelines that flag fraud and security threats in large log datasets by surfacing abnormal and suspicious patterns.",
    bullets: [
      {
        text: "Engineered 500K+ row datasets and built anomaly detection pipelines for fraud/threat identification, training ML models to 85% accuracy for log-based security anomaly detection",
        swe: "Engineered 500K+ row datasets and built ML anomaly detection pipelines for fraud/threat identification, training models to 85% accuracy on log data",
      },
      "Applied feature engineering and regression modeling to surface abnormal and suspicious patterns",
    ],
    // TODO: Replace with the actual tools used (e.g. language, ML libraries).
    stack: ["Machine Learning", "Feature Engineering", "Regression Modeling"],
    tags: ["Machine Learning", "Detection", "Data Security"],
    focus: "both",
    order: { all: 5, security: 5, swe: 4 },
    // TODO: Add project date, and GitHub/writeup links if they can be shared publicly.
    date: undefined,
    links: {},
  },
  {
    title: "Lexical Analyzer, Parser & Interpreter",
    // TODO: Add context if this was a course project (e.g. the NJIT course name).
    description:
      "A compiler design project in C++: a lexical analyzer, a CFG-based recursive-descent parser, and an interpreter that executes SADAL, a small Ada-like procedural language.",
    bullets: [
      "Built a recursive-descent parser with one-token lookahead that mirrors the language's context-free grammar and executes code directly as it is parsed",
      "Supported five data types, assignment, input/output, if/elsif/else control flow, string indexing and slicing, and relational, arithmetic, concatenation, exponentiation, and unary operators",
      "Implemented semantic checks for undeclared or redefined variables, uninitialized use, illegal types, out-of-range indices, and division by zero, with line-numbered error reporting",
    ],
    stack: ["C++"],
    tags: ["Compilers", "Systems Programming"],
    focus: "swe",
    order: { all: 6, swe: 5 },
    // TODO: Add project date.
    date: undefined,
    links: { github: "https://github.com/amreenbhatia1/Lexical_Analyzer_Parser_and_Interpreter" },
  },
  {
    title: "Predicting NYC Tax Blocks with Supervised Learning",
    description:
      "A supervised machine learning model that predicts the tax block of New York City–owned and leased properties from location, borough, and use code.",
    bullets: [
      "Prepared NYC Open Data's City Owned and Leased Property (COLP) dataset with pandas: dropped missing targets, label-encoded categorical columns, and mean-imputed and standardized features",
      "Trained a scikit-learn linear regression model on latitude, longitude, borough, and use code, reaching an R² of 0.616 on the test split",
      "Explored the data with a correlation heatmap, distribution and box plots, and an actual-vs-predicted plot",
    ],
    stack: ["Python", "pandas", "scikit-learn", "Jupyter"],
    tags: ["Machine Learning", "Data Science"],
    focus: "swe",
    order: { all: 7, swe: 6 },
    // TODO: Add project date.
    date: undefined,
    links: { github: "https://github.com/amreenbhatia1/nyc-tax-block-prediction" },
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    focus: "both",
    items: ["Python", "TypeScript", "Java", "C/C++", "SQL", "Bash", "PowerShell", "Perl"],
  },
  {
    category: "Web & Backend",
    focus: "swe",
    items: [
      "React",
      "FastAPI",
      "REST API Design",
      "PostgreSQL",
      "Supabase",
      "Database Schema Design & Migrations",
    ],
  },
  {
    category: "AI/ML & Agents",
    focus: "both",
    items: [
      "LLM Application Development",
      "OpenAI API",
      "AI Agents (Google ADK)",
      "Prompt Engineering",
      "LLM Output Verification",
      "AI Security Guardrails",
      "Multi-step Workflow Automation",
      "Machine Learning",
      "Anomaly Detection",
      "Feature Engineering",
      "Regression Modeling",
      { name: "pandas", focus: "swe" },
      { name: "scikit-learn", focus: "swe" },
    ],
  },
  {
    category: "CS Fundamentals",
    focus: "swe",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Databases (MySQL)", "Operating Systems", "Data Science", "Compiler Design"],
  },
  {
    category: "Detection & Security Engineering",
    focus: "security",
    items: [
      { name: "Detection Engineering", focus: "both" },
      "Threat Detection",
      "Threat Hunting",
      { name: "SIEM", focus: "both" },
      { name: "SOAR Automation", focus: "both" },
      "Log Analysis",
      { name: "Incident Response", focus: "both" },
      "IOC Analysis",
      "Correlation Searches",
      "IDS/IPS",
      "Network Security Monitoring",
      "Malware Analysis",
      "Vulnerability & Patch Management",
      "Security Assessments",
      "Security Hardening",
      { name: "Application Security", focus: "both" },
      { name: "Authentication & Access Control", focus: "both" },
      { name: "Input Validation", focus: "both" },
    ],
  },
  {
    category: "Security Frameworks",
    focus: "security",
    items: [
      { name: "MITRE ATT&CK", focus: "both" },
      "NIST SP 800-61",
      "ISO 27001",
      "Cyber Kill Chain",
      "Incident Response Lifecycle",
      "BCDR",
    ],
  },
  {
    category: "Security & Infrastructure Tools",
    focus: "security",
    items: [
      { name: "Splunk Enterprise", focus: "both" },
      { name: "Splunk SOAR", focus: "both" },
      "Wireshark",
      "Cisco Packet Tracer",
      "Kali Linux",
      "Ubuntu",
      "Active Directory",
    ],
  },
  {
    category: "Tools & Version Control",
    focus: "both",
    items: ["GitHub", "GitHub Actions (CI)", "MySQL", "Linux", { name: "Jupyter", focus: "swe" }],
  },
];

export const certifications: Certification[] = [
  // TODO: Add issue dates and verification URLs (e.g. Credly badges) for each certification.
  { name: "CompTIA Security+", issuer: "CompTIA", status: "Active", focus: "both" },
  {
    name: "NVIDIA Certified Professional – Agentic AI (NCP-AAI)",
    issuer: "NVIDIA",
    status: "In Progress",
    focus: "swe",
  },
  {
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    status: "Completed",
    focus: "security",
    detail: "8-course track",
  },
  {
    name: "Splunk Core User & SOAR Fundamentals",
    issuer: "Splunk",
    status: "Completed",
    focus: "security",
    detail: "8-course track",
  },
  {
    name: "Cybersecurity Bootcamp",
    issuer: "World Wide Technology",
    status: "Completed",
    focus: "security",
    detail: "Network security, ethical hacking, malware analysis, incident response, CTFs",
  },
  {
    name: "Palo Alto Networks Next-Generation Firewall (Intermediate)",
    issuer: "World Wide Technology",
    status: "Completed",
    focus: "security",
  },
  {
    name: "Mastering Threat Detection and Incident Response (Intermediate)",
    issuer: "World Wide Technology",
    status: "Completed",
    focus: "security",
  },
];

/** Each list is hidden on the live site while empty. */
export const achievements: {
  ctfs: Achievement[];
  bugBounties: Achievement[];
  cves: Achievement[];
  publications: Achievement[];
} = {
  // TODO: Add CTF results (event, placement/rank, team, date, link to writeup).
  ctfs: [],
  // TODO: Add bug bounty findings or hall-of-fame mentions, if any.
  bugBounties: [],
  // TODO: Add CVEs you've been credited with, if any.
  cves: [],
  // TODO: Add publications or talks, if any.
  publications: [],
};

export const education: Education[] = [
  {
    school: "New Jersey Institute of Technology (NJIT)",
    degree: "B.S./M.S. in Computer Science & Cybersecurity and Privacy",
    location: "Newark, NJ",
    graduation: "Expected May 2027",
    gpa: "3.657 / 4.0",
    honors: [
      "NJIT Merit Scholarship",
      "Dean's List every semester: Fall 2023, Spring 2024, Fall 2024, Spring 2025, Fall 2025, Spring 2026",
    ],
    coursework: [
      "Intro to Cybersecurity",
      "Security & Privacy",
      "Cryptography & Internet Security",
      "Computer Networks",
      "Information Systems",
      "Operating Systems",
      // TODO: Confirm the course name. The security resume says "Programming in Ubuntu Linux".
      "Intensive Programming in Linux",
      "Data Structures & Algorithms",
      "Database Design & Management",
      "Data Science",
      "Python",
      "Java",
      "C/C++",
    ],
  },
];
