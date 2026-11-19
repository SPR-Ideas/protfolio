// All portfolio copy lives here. Source: the Portfolio Content Pack. Do not add facts that are not in it.

export const TO_ADD = "[TO ADD]";

export const identity = {
  name: "Pradeep Ragul S",
  headline: "Senior Engineer · DevOps & Cloud · AI Platform Engineer",
  tagline: "Build. Automate. Share.",
  intro:
    "I build cloud platforms that are automated, secure and resilient across Azure and AWS, and I help teams take GenAI from prototype to production.",
  location: "Coimbatore, Tamil Nadu, India",
  email: "1606pradeepragul@gmail.com",
  phone: "+91 95008 90076",
  phoneHref: "+919500890076",
  linkedin: "https://www.linkedin.com/in/pradeep-ragul-s-5152271a9/",
  github: "https://github.com/SPR-Ideas",
  azureUserGroup: "https://www.linkedin.com/company/azure-user-group-community-coimbatore/",
  resume: "https://drive.google.com/file/d/1L-BvQF0RZH1uraN1X5q6i7140S4kTE-W/view?usp=sharing",
};

export const stats = [
  { prefix: "", value: 10, suffix: "+", label: "Business units on a CI/CD platform I architected" },
  { prefix: "~", value: 50, suffix: "%", label: "Shorter deployment lifecycle" },
  { text: "Weeks → 1 day", label: "Application onboarding time" },
  { prefix: "", value: 8, suffix: "", label: "Azure subscriptions automated in one landing zone" },
  { prefix: "", value: 5, suffix: "", label: "Professional certifications" },
  { prefix: "", value: 200, suffix: "+", label: "Community members, Azure User Group Coimbatore" },
  { prefix: "", value: 40, suffix: "+", label: "Engineers mentored" },
] as const;

export const about = {
  paragraphs: [
    "Senior Engineer with ~3.8 years of experience (including internship) designing, automating and securing cloud platforms on Azure and AWS across financial services, healthcare, government and manufacturing.",
    "I work at a consulting company, so every engagement brings a new client, a new tech stack and new constraints. That has taught me to get up to speed quickly and deliver on whatever stack the client runs. My work spans modular Terraform and Bicep infrastructure, standardized CI/CD and DevSecOps pipelines, landing zones, private networking, and active-active multi-region disaster-recovery strategies designed for near-zero downtime.",
    "More recently I've focused on AI platform engineering: taking GenAI workloads from pilot to production and designing agentic operations platforms with Azure AI Foundry and the Model Context Protocol (MCP).",
    "I care just as much about people as platforms. I co-organize Azure User Group Coimbatore (200+ members), speak at community events and have mentored 40+ engineers.",
  ],
  cards: [
    { icon: "blueprint", title: "Architecture from requirements", text: "I turn business problems into clear, buildable cloud designs." },
    { icon: "gear", title: "Automation first", text: "IaC, reusable pipelines and self-service onboarding that remove repetitive work." },
    { icon: "shield", title: "Secure and resilient by default", text: "Private networking, WAF, policy-as-code and multi-region failover." },
    { icon: "spark", title: "AI platform engineering", text: "RAG infrastructure, LLM observability and governed multi-agent systems." },
    { icon: "people", title: "Community and enablement", text: "Teaching, speaking and building local tech communities." },
  ],
};

export type CaseStatus = "implemented" | "designed" | "poc" | "lab";

export interface CaseStudy {
  id: string;
  n: string;
  title: string;
  sector: string;
  dates: string;
  role: string;
  status: CaseStatus;
  statusLabel: string;
  headline: string;
  metrics?: string[];
  challenge?: string;
  did: string[];
  outcome?: string[];
  stack: string[];
  note?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cicd",
    n: "01",
    title: "Enterprise CI/CD Platform",
    sector: "Banking (US financial institution)",
    dates: "May 2025 – Present",
    role: "Senior DevOps Engineer, CI/CD architect",
    status: "implemented",
    statusLabel: "Implemented, in active use",
    headline: "One shared pipeline framework, one validated artifact promoted everywhere.",
    metrics: ["10+ business units", "25+ repositories", "~50% shorter lifecycle", "Weeks → 1 day onboarding"],
    challenge:
      "Many business units each used their own Git branching and CI/CD conventions. Teams rebuilt different versions from different branches for each environment, so it was hard to trace which artifact was running where during support and incidents. Deployments needed manual triggers and repeated builds, which pulled developers away from product work.",
    did: [
      "Chose GitFlow as the shared branching strategy and Build Once, Deploy Many (BODM), so one validated artifact is promoted through every environment.",
      "Architected and built the core shared pipeline framework on Azure DevOps using central, reusable templates.",
      "Built a self-service onboarding pipeline for new repositories.",
      "Embedded Snyk, SonarQube, Checkov and 42Crunch security and quality gates into every shared template.",
      "Extended deploy targets to Azure App Service, Azure Functions (Windows and Linux) and .NET 10 solutions, and added hotfix flows, configurable promotion paths and pipeline-managed app settings.",
      "Wrote reusable Terraform modules for Azure API Management (OpenAPI specs and policies), Event Hubs and Service Bus.",
      "Engineered a secure ServiceNow → Azure API Management → on-premises Ansible Automation Platform integration.",
      "Worked with stakeholder teams on a phased adoption plan.",
    ],
    outcome: [
      "Adopted by 10+ business units and 25+ application repositories",
      "~50% shorter deployment lifecycle",
      "Onboarding cut from weeks to 1 day",
      "Clear artifact traceability and a consistent security baseline across teams",
      "Recognized by the client's senior leadership",
    ],
    stack: ["Azure DevOps", "YAML templates", "GitFlow", "Terraform", "Azure API Management", "Event Hubs", "Service Bus", "Snyk", "SonarQube", "Checkov", "42Crunch", "ServiceNow", "Ansible Automation Platform", ".NET", "Node.js"],
  },
  {
    id: "pilot",
    n: "02",
    title: "Taking a Live AI Pilot to Production",
    sector: "Investment management",
    dates: "Sep 2024 – Jul 2025",
    role: "Sole DevOps engineer",
    status: "implemented",
    statusLabel: "Implemented in production",
    headline: "From a hand-built pilot to Terraform-managed, multi-region production, without pausing delivery.",
    metrics: ["2 Azure regions", "Active-active", "Designed for near-zero downtime"],
    challenge:
      "An AI application was already in use by the client, but all of its infrastructure had been set up manually, with no IaC and incomplete security controls. I was the only DevOps engineer supporting 5–6 developers who shipped 2–3 changes a week, so the migration had to happen without pausing feature delivery.",
    did: [
      "Converted the manually built Azure infrastructure to modular Terraform with standard naming, tagging, remote state and multi-environment provisioning.",
      "Built automated Azure DevOps CI/CD for infrastructure and releases.",
      "Implemented active-active multi-region resilience across two Azure regions (East US 2 and Central US), using Azure Front Door for global routing and automatic failover, with database replication. All of it is managed through Terraform.",
      "Hardened security with private endpoints and private networking, Front Door WAF and a single controlled entry point.",
      "Built a secure SFTP → Azure AI Search ingestion workflow for AI retrieval.",
      "Set up self-hosted Langfuse LLM observability on Azure Container Apps.",
    ],
    outcome: [
      "Turned a manually configured pilot into secure, Terraform-managed, multi-region production infrastructure",
      "Feature delivery continued uninterrupted throughout the migration",
      "Designed for near-zero downtime",
      "Received special recognition for cloud infrastructure modernization",
    ],
    stack: ["Azure", "Terraform", "Azure DevOps", "Azure Front Door (WAF)", "App Service", "Static Web Apps", "Container Apps", "Azure AI Search", "PostgreSQL Flexible Server", "Key Vault", "App Configuration", "Private Endpoints", "Private DNS", "Application Insights", "Log Analytics", "Langfuse"],
  },
  {
    id: "rag",
    n: "03",
    title: "AWS GenAI & RAG Infrastructure",
    sector: "Healthcare / life sciences",
    dates: "Dec 2024 – Jun 2025",
    role: "Senior DevOps Engineer, cloud architect",
    status: "implemented",
    statusLabel: "Implemented (infrastructure); one cost optimization was proposed",
    headline: "Secure, repeatable RAG infrastructure across three environments and two AWS accounts.",
    metrics: ["3 environments", "2 AWS accounts", "Internal-only access"],
    challenge:
      "A healthcare GenAI product needed secure, repeatable infrastructure for a retrieval-augmented generation (RAG) application across separate environments and AWS accounts.",
    did: [
      "Designed the end-to-end architecture and led implementation with the team.",
      "Built Terraform infrastructure for three environments (Dev, Validation, Production) across two AWS accounts, with state kept separate per account.",
      "Ran API and ingestion containers on ECS Fargate, model inference on Amazon Bedrock, retrieval on OpenSearch and data in RDS PostgreSQL, with Lambda, SQS and EventBridge for event-driven processing.",
      "Built GitLab CI/CD with Checkov and Infracost checks and environment approvals.",
      "Moved a public-facing application to internal-only access using VPC isolation, security groups, Route 53 and Okta SSO.",
      "Proposed a shared OpenSearch domain for the non-production environments to reduce duplicate infrastructure.",
    ],
    outcome: [
      "Secure, repeatable RAG platform infrastructure across three environments",
      "Built-in security, cost checks and approval gates in every deployment",
      "The application is now reachable only internally",
    ],
    stack: ["AWS", "Terraform", "ECS Fargate", "Amazon Bedrock", "OpenSearch", "RDS PostgreSQL", "Lambda", "SQS", "EventBridge", "S3", "KMS", "VPC", "ALB", "Route 53", "Okta SSO", "GitLab CI/CD", "Checkov", "Infracost"],
    note: "The shared non-production OpenSearch domain was a proposal, not a delivered change.",
  },
  {
    id: "agentic",
    n: "04",
    title: "Agentic Infrastructure Operations Platform",
    sector: "Healthcare (Fortune 500)",
    dates: "May 2026 – Oct 2026",
    role: "Forward-deployed engineer, agentic platform architect",
    status: "designed",
    statusLabel: "Architecture designed",
    headline: "A governed multi-agent design that turns scattered triage into one incident report.",
    metrics: ["4 specialist agents", "MCP via governed gateway", "Human approval for prod actions"],
    challenge:
      "When something breaks in cloud operations, triage is spread across separate tools for logs, cloud health, infrastructure drift and remediation. Each one needs manual hand-offs.",
    did: [
      "Designed the end-to-end application and infrastructure architecture on Azure AI Foundry.",
      "Designed a master orchestrator that coordinates four specialist agents (Azure, Terraform, Ansible and Splunk Cloud) through Model Context Protocol (MCP) integrations.",
      "Used Azure API Management as a governed MCP and tool gateway enforcing authentication, RBAC and controlled tool execution.",
      "Required human approval for any production-impacting action.",
    ],
    outcome: [
      "The architecture was reused as a reference for further enterprise pre-sales",
      "Recognized internally for enterprise AI architecture excellence",
    ],
    stack: ["Azure AI Foundry", "Multi-agent orchestration", "MCP", "Azure API Management", "RBAC", "Terraform", "Ansible Automation Platform", "Splunk Cloud", "Azure"],
    note: "Architecture designed; the team carried out implementation work. Not presented as running in production.",
  },
  {
    id: "landing-zone",
    n: "05",
    title: "Government Azure Landing Zone",
    sector: "Government / transportation",
    dates: "Jun 2024 – Aug 2024",
    role: "Cloud Engineer",
    status: "implemented",
    statusLabel: "Implemented",
    headline: "Eight subscriptions, one automated and policy-governed landing zone.",
    metrics: ["8 subscriptions", "CIS & NIST aligned policy"],
    did: [
      "Automated an Azure landing zone spanning 8 subscriptions with Terraform, covering management groups, networking, identity and governance.",
      "Built modular Terraform with a multi-repository strategy, plus reusable Azure DevOps IaC pipeline templates.",
      "Embedded Checkov, TFSec and Infracost for security and cost checks.",
      "Applied Azure Policy aligned with CIS and NIST, including tagging, compliance controls and alerts.",
      "Integrated LogicMonitor, Qualys and SonarQube.",
    ],
    stack: ["Azure", "Terraform", "Azure DevOps", "Azure Policy", "Management Groups", "Checkov", "TFSec", "Infracost", "LogicMonitor", "Qualys", "SonarQube"],
  },
  {
    id: "modernization",
    n: "06",
    title: "Azure Modernization",
    sector: "Food and agriculture / manufacturing",
    dates: "Dec 2023 – May 2024",
    role: "DevOps Engineer",
    status: "implemented",
    statusLabel: "Implemented",
    headline: "Bicep-native IaC, an APIM upgrade and automated certificate renewal.",
    metrics: ["APIM v1 → v2", "Bicep", "Auto SSL renewal"],
    did: [
      "Delivered the Azure API Management Standard v1 → v2 upgrade.",
      "Built Azure-native IaC with Bicep, including migrating some definitions from Terraform to Bicep.",
      "Migrated an event-driven Python Azure Function from programming model v1 to v2.",
      "Automated wildcard SSL certificate renewal for App Services, APIM and Application Gateway with Bicep and PowerShell.",
      "Built a proof of concept for event-driven app registration secret rotation.",
    ],
    stack: ["Azure", "Bicep", "PowerShell", "Azure API Management", "Azure Functions (Python)", "App Service", "Application Gateway"],
  },
];

export const smallProject = {
  title: "Private GenAI Accelerator (internal)",
  dates: "Sep 2024 – Oct 2024",
  status: "Internal proof of concept",
  text: "Streamlined CI/CD for an internal private GenAI accelerator, designed an offline packaged deployment to a single NVIDIA DGX system, and built a custom log-collection container image.",
  stack: ["Docker", "Docker Compose", "NVIDIA DGX", "private LLM packaging"],
};

export const homelab = {
  status: "Personal lab, actively growing",
  points: [
    "Reused an old laptop as a Proxmox VE host running a single-node K3s Kubernetes cluster.",
    "Deploys everything declaratively with Argo CD (GitOps).",
    "Uses Traefik for ingress and Tailscale for secure remote access from anywhere.",
    "Hosts 10+ self-hosted services used daily, including Excalidraw and Vaultwarden.",
  ],
  next: ["Persistent storage", "Automated backups", "Observability stack (Prometheus and Grafana)"],
  stack: ["Proxmox", "K3s", "Kubernetes", "Argo CD", "GitOps", "Traefik", "Tailscale", "Linux"],
  note: "A single-node personal lab.",
};

export const timeline = {
  employer: "Presidio",
  span: "Feb 2023 – Present",
  roles: [
    { date: "Feb 2023", title: "Intern" },
    { date: "Sep 2023", title: "Associate Engineer" },
    { date: "Sep 2024", title: "Engineer" },
    { date: "Sep 2026", title: "Senior Engineer" },
  ],
  milestones: [
    { date: "Dec 2023", text: "AZ-104 Azure Administrator", kind: "cert" },
    { date: "Jun 2024", text: "AZ-400 DevOps Engineer Expert", kind: "cert" },
    { date: "2025", text: "AZ-700 Azure Network Engineer and HashiCorp Terraform Associate", kind: "cert" },
    { date: "Aug 2025", text: "Co-founded and launched Azure User Group Coimbatore meetups", kind: "community" },
    { date: "Feb 2026", text: "AI-102 Azure AI Engineer", kind: "cert" },
    { date: "Jun 2026", text: "Spoke at Microsoft Build //localhost Coimbatore", kind: "community" },
  ],
};

export const skills = [
  { cat: "Cloud: Azure", items: ["API Management", "Front Door (WAF, global failover)", "App Service", "Functions", "Container Apps", "AI Search", "Key Vault", "App Configuration", "PostgreSQL Flexible Server", "Event Hubs", "Service Bus", "VNet", "Private Endpoints", "Private DNS", "Entra ID", "RBAC", "Azure Policy", "Landing Zones", "Azure Monitor", "Application Insights"] },
  { cat: "Cloud: AWS", items: ["ECS Fargate", "Bedrock", "OpenSearch", "RDS PostgreSQL", "Lambda", "SQS", "EventBridge", "S3", "VPC", "IAM", "KMS", "ALB", "CloudFront", "Route 53", "multi-account setups"] },
  { cat: "Infrastructure as Code", items: ["Terraform (modules, remote state, multi-repo, AzureRM / AWS / azapi)", "Bicep", "ARM"] },
  { cat: "CI/CD & DevSecOps", items: ["Azure DevOps Pipelines", "GitLab CI/CD", "GitFlow", "Build Once Deploy Many", "reusable YAML templates", "Snyk", "SonarQube", "Checkov", "TFSec", "42Crunch", "Infracost"] },
  { cat: "AI Platform", items: ["Azure AI Foundry", "Azure OpenAI", "multi-agent orchestration", "Model Context Protocol (MCP)", "RAG", "Langfuse", "Amazon Bedrock"] },
  { cat: "Containers & GitOps", items: ["Docker", "Kubernetes (K3s)", "Argo CD", "Traefik", "ECS Fargate", "Azure Container Apps"] },
  { cat: "Automation & Ops", items: ["Ansible Automation Platform", "ServiceNow integration", "Splunk Cloud", "LogicMonitor"] },
  { cat: "Scripting", items: ["PowerShell", "Bash", "Python", "YAML", "HCL"] },
  { cat: "Practices", items: ["Multi-region DR and high availability", "private networking", "policy as code", "platform engineering", "self-service developer experience"] },
];

export const tickerTech = ["Azure", "AWS", "Terraform", "Bicep", "Azure DevOps", "GitLab CI/CD", "Kubernetes", "Argo CD", "Ansible", "Azure AI Foundry", "MCP", "Bedrock", "Front Door", "API Management", "Docker", "Python", "PowerShell"];

export const certs = [
  { name: "Microsoft Certified: DevOps Engineer Expert", code: "AZ-400", year: "2024", img: "/certs/az-400.png", alt: "Microsoft Certified DevOps Engineer Expert badge" },
  { name: "Microsoft Certified: Azure AI Engineer Associate", code: "AI-102", year: "2026", img: "/certs/ai-102.png", alt: "Microsoft Certified Azure AI Engineer Associate badge" },
  { name: "Microsoft Certified: Azure Network Engineer Associate", code: "AZ-700", year: "2025", img: "/certs/az-700.png", alt: "Microsoft Certified Azure Network Engineer Associate badge" },
  { name: "HashiCorp Certified: Terraform Associate", code: "003", year: "2025", img: "/certs/terraform.png", alt: "HashiCorp Certified Terraform Associate badge" },
  { name: "Microsoft Certified: Azure Administrator Associate", code: "AZ-104", year: "2023", img: "/certs/az-104.png", alt: "Microsoft Certified Azure Administrator Associate badge" },
];

export const community = {
  role: "Co-organizer, Azure User Group Coimbatore",
  span: "Aug 2025 – Present",
  text: "I've run this community for over a year. It has grown to 200+ members, and we've organized 5+ events with speakers, colleges and partner organizations, covering Azure, cloud-native, DevOps and GenAI.",
  events: [
    { date: "Aug 2025", name: "Azure User Group Coimbatore launch meetup", role: "Co-organizer and speaker" },
    { date: "Sep 2025", name: "VS Code Dev Days", role: "Workshop lead" },
    { date: "Dec 2025", name: "Azure User Group meetup", role: "Organizer" },
    { date: "Jun 2026", name: "Microsoft Build //localhost, Coimbatore", role: "Speaker / workshop" },
    { date: "Jul 2026", name: "CNCF Coimbatore meetup", role: "Organizing support" },
    { date: "Aug 2026", name: "Global AI Construct, Coimbatore", role: "Workshop, mentoring and organizing support" },
  ],
  talks: [
    { title: "Inside AI Foundry: The Complete AI Agent Lifecycle", event: "Microsoft Build //localhost, Coimbatore", date: "Jun 2026", href: "https://docs.google.com/presentation/d/1fkpPJnME4Tccuz8uH4gaVigqxBUL3tgO/edit?usp=sharing&ouid=116361408868956417435&rtpof=true&sd=true", kind: "Slides" },
    { title: "Building Resilient GenAI Apps: Best Practices from Dev to Prod", event: "Azure User Group Coimbatore", date: "Aug 2025", href: "https://drive.google.com/file/d/1qbRMTW3JwIocyv70TwiJx0d4BFdKwrEw/view?usp=sharing", kind: "Slides" },
    { title: "VS Code Dev Days workshop", event: "VS Code Dev Days", date: "Sep 2025", href: "", kind: "Slides" },
  ],
  mentoring: [
    "Mentored and trained 40+ engineers.",
    "Designed a 4-week Azure enablement program to help AWS-experienced engineers move onto Azure projects. It used low-cost sandbox subscriptions, weekly live syncs, peer reviews and a hackathon-style mini project.",
    "Built a graduate academy curriculum that runs from fundamentals to delivery: Linux → PowerShell → Networking → AWS → Azure → Docker → Kubernetes → Terraform → Ansible → CI/CD → Migration.",
    "Started peer lightning talks (5–10 minutes, no slides required) to build confidence and communication skills.",
    "Ran internal knowledge-sharing sessions, including an AWS re:Invent recap series and a bi-monthly tech-sharing series.",
  ],
  academy: ["Linux", "PowerShell", "Networking", "AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Ansible", "CI/CD", "Migration"],
};

// Captions only restate text visible in the photos themselves.
export const gallery = [
  { src: "/photos/azure-ug.jpg", alt: "Presenting at an Azure User Group Coimbatore session", caption: "Azure User Group Coimbatore", w: 4, h: 3 },
  { src: "/photos/little-about-me.jpg", alt: "On stage in front of a 'Little About Me' slide", caption: "On stage · “Little About Me”", w: 4, h: 3 },
  { src: "/photos/cncf.jpg", alt: "At the CNCF Coimbatore meetup", caption: "CNCF Coimbatore meetup", w: 4, h: 3 },
  { src: "/photos/owasp.jpg", alt: "At the OWASP Workshop, Coimbatore chapter", caption: "OWASP Workshop · Coimbatore chapter", w: 3, h: 4 },
  { src: "/photos/kpr.jpg", alt: "On stage at KPR College of Arts, Science and Research", caption: "KPR College of Arts, Science and Research · 11 Sep 2025", w: 4, h: 3 },
  { src: "/photos/speaking.jpg", alt: "Speaking with a microphone", caption: "Speaking", w: 4, h: 3 },
];

export const recognition = [
  { title: "Promoted to Senior Engineer", meta: "Sep 2026" },
  { title: "Above & Beyond Award", meta: "Presidio · Q3 2025" },
  { title: "Multiple Spot Awards", meta: "Modernization, teamwork and delivery" },
  { title: "Client senior leadership recognition", meta: "DevOps transformation and CI/CD standardization" },
  { title: "Enterprise AI Architecture Excellence", meta: "For the agentic platform design" },
  { title: "Cloud Infrastructure Modernization", meta: "For taking an AI pilot to production" },
  { title: "Winning hackathon team", meta: "2026" },
];

export const education = {
  degree: "B.E., Electronics and Communication Engineering",
  school: "SNS College of Technology, Coimbatore · 2023",
  extra: "Department President, ECE",
};

export const contact = {
  heading: "Let's build something reliable.",
  body: "I'm open to Senior DevOps, Cloud and AI Platform Engineering roles, and always happy to talk about cloud architecture, GenAI in production or community events.",
};
