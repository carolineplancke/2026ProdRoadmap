import {
  Trophy,
  Zap,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { FiveYearRoadmap } from "@/app/components/FiveYearRoadmap";
import { HICGanttChart } from "@/app/components/HICGanttChart";
import { HICSection } from "@/app/components/HICSection";
import { useState } from "react";
import nextAvailableCounselorImg from "assets2\e5a72e1836c4ccd8e214c6d20f7afcf4beb5a7bd.png";
import mentalHealthDashboardImg from "assets2\e5de65f56976868db5b3848db4b4409feb02aa17.png";
import dependentRegistrationImg from "assets2\8c482eec0878062b1ba5cecd4c28a1a0a6d8b5ba.png";
import guidedInteractionsImg from "assets2\4121acf4a22eb6f70f77d136e1c7bc8c0639e6b2.png";
import personalizedDashboardImg from "assets2\b26ef51ce6e26f34c77f78015dee872bec97d1c1.png";
import carePathwaysImg from "assets2\8b9e8c5aa647b3c51b1585172cae8934cd08c823.png";

// Deliverables with embedded metrics
const deliverables = [
  {
    title: "Next Available Counsellor",
    quarter: "Q1",
    director: "Matt Parks",
    problem:
      "Some members find selecting a provider to be cumbersome as shown by our drop off rates in both the matching and instant matching conversion funnels.",
    opportunity:
      "Adding the option to initiate a booking flow and auto match with the next available provider within the region – driving booking conversion for those who don't want to self-select a provider.",
    solution: [
      "Selection of Next Available flow",
      "Automatching with next available provider",
      "Bypass optionality including instant/matching algorithm",
      "Streamlined booking flow and notification",
      "Allows for some booking flows with other provider types (ex. HH, PN, THL)",
    ],
    metric: {
      title: "Session Utilization",
      current: "9.76%",
      startOfYear: "5.1%",
      target: "≥11%",
    },
    image: nextAvailableCounselorImg,
  },
  {
    title: "Mental Health Dashboard Redesign",
    quarter: "Q2",
    director: "Matt Parks",
    problem:
      "Our current counselling dashboard prioritizes care team and matches with very little functionality associated to it. As we continue to optimize customer experience, our dashboard needs to align.",
    opportunity:
      "We have an opportunity within the dashboard experience to promote booking in a way that drives conversions and improves utilization of sponsored and non-sponsored hours.",
    solution: [
      "Refreshed dashboard experience",
      "Prioritization of appointments/booking experience including booking from the care team card",
      "Promotion of counselling value propositions",
      "Laying foundation for cross promotion and step-based care",
    ],
    metric: {
      title: "Session Utilization",
      current: "6.76%",
      startOfYear: "5.1%",
      target: "≥11%",
    },
    image: mentalHealthDashboardImg,
  },
  {
    title: "Dependent Registration Reimagined",
    quarter: "Q3",
    director: "Jadel McGuire & Ifra Jamil",
    problem:
      "Dependents often rely on the primary member, creating bottlenecks and limiting engagement. Without their own access, spouses and children miss opportunities to book, manage, and track care independently.",
    opportunity:
      "With age-appropriate, province-aware onboarding we can empower the entire household to access, book care, and stay engaged with GS+.",
    solution: [
      "Simple invitation flow for primaries with clear value messaging",
      "Dependent-specific onboarding that explains personal benefits and independence",
      "Province-aware age rules built directly into registration",
    ],
    metric: {
      title: "Monthly Active Users",
      current: "26%",
      startOfYear: "21%",
      target: "≥30% MAU",
    },
    image: dependentRegistrationImg,
  },
  {
    title: "Guided Interactions",
    quarter: "Q3",
    director: "Jadel McGuire & Ifra Jamil",
    problem:
      "New users land in GS+ with no guided first step, unclear what available in their program, and not enough understanding on service value. This may leave them overwhelmed, navigating by trial and error, and less likely to engage.",
    opportunity:
      "Guided interactions transforms GS+ from a complex benefits app into a trusted digital front door to care — increasing adoption, building early trust, and driving engagement.",
    solution: [
      "Members are introduced to the value of the app and their benefits as soon as they log-in for the first time",
      "Helpful nudges and tooltips explain features as they explore",
      "Right away, they see value driven language — like 'Free prescription delivery' or '24/7 mental health support'",
      "Changes as they log in in future",
    ],
    metric: {
      title: "Monthly Active Users",
      current: "26%",
      startOfYear: "21%",
      target: "≥30% MAU",
    },
    image: guidedInteractionsImg,
  },
  {
    title: "Personalized Dashboard",
    quarter: "Q4",
    director: "Jadel McGuire & Ifra Jamil",
    problem:
      "The current dashboard feels generic, burying personalized content like recent claims and missing the chance to guide members toward meaningful actions and healthier behavior.",
    opportunity:
      "A dynamic, personalized dashboard can become each member's one-stop hub — surfacing what matters most in real time, reducing friction, and driving engagement.",
    solution: [
      "NBA/NBO evolves into dynamic, machine-learning powered dashboard components",
      "Layout adapts instantly to profile, claims history, and health needs",
      "One view for credits, claims, appointments, and balances",
      "Proactive prompts to high-value actions ('View claim update,' 'Submit prescription')",
      "Fewer clicks, less confusion, more confidence",
    ],
    metric: {
      title: "Cross Product Utilization",
      current: "2.5%",
      startOfYear: ">1%",
      target: "≥5%",
    },
    image: personalizedDashboardImg,
  },
  {
    title: "Personalized Care Pathways",
    quarter: "Q4",
    director: "Matt Parks & Ifra Jamil",
    problem:
      "GS+ has the data to guide health journeys, but today insights rarely surface in the experience — leaving members without support in navigating treatment or chronic care.",
    opportunity:
      "Personalized pathways can turn GS+ into a true digital health assistant — coordinating cross-service journeys and keeping members on track day to day.",
    solution: [
      "Personalized care plans tied directly to benefits",
      "'Looking ahead' planning for chronic conditions, life events or coverage changes",
      "Coordinated journeys across services (e.g., surgery → physio → mental health → nutrition)",
      "Treatment plans that adapt over time with member progress",
    ],
    metric: {
      title: "Customer Satisfaction",
      current: "95%",
      startOfYear: "N/A",
      target: "Maintain 90% or better",
    },
    image: carePathwaysImg,
  },
];

// GreenShield+ 2026 Roadmap Data
const roadmapData = [
  {
    id: "q1-1",
    title: "Mental Health: Next Available Counsellor Flow",
    description:
      "Auto-matching with next available provider for members who want care fast. Streamlined booking flow bypassing provider selection.",
    quarter: 1,
    track: "Booking & Access",
  },
  {
    id: "q1-2",
    title: "Focus on Aging: GreenShield + Discover",
    description:
      "Comprehensive support for aging members, integrating GreenShield benefits with Discover resources for holistic care.",
    quarter: 1,
    track: "Member Engagement",
  },
  {
    id: "q1-3",
    title: "Well-Being: Corporate Challenges",
    description:
      "Interactive corporate challenges designed to drive employee engagement, team building, and overall well-being.",
    quarter: 1,
    track: "Member Engagement",
  },
  {
    id: "q1-4",
    title: "Premium Outcome Report: Mental Health",
    description:
      "Detailed reporting on mental health outcomes and ROI for plan sponsors, highlighting care effectiveness.",
    quarter: 1,
    track: "Personalization",
  },
    {
    id: "q1-5",
    title: "Travel Insurance: MGA",
    description:
      "Placeholder",
    quarter: 1,
    track: "Insurance",
  },
  {
    id: "q2-1",
    title: "Mental Health: Dashboard Redesign",
    description:
      "Refreshed dashboard prioritizing appointments and booking experience. Foundation for cross-promotion and step-based care.",
    quarter: 2,
    track: "Member Engagement",
  },
  {
    id: "q2-2",
    title: "Premium Outcome Report: Women's Health",
    description:
      "Insights and outcomes analysis specifically for women's health initiatives, tracking engagement and health improvements.",
    quarter: 2,
    track: "Personalization",
  },
  {
    id: "q3-1",
    title: "Guided Interactions",
    description:
      "Personalized onboarding, monthly topics, and new launch highlights. Transforms GS+ into a trusted digital front door.",
    quarter: 3,
    track: "Member Engagement",
  },
  {
    id: "q3-2",
    title: "Launch of CCaS, with integrated chat agents",
    description:
      "Contact Center as a Service integration featuring AI-powered chat agents for immediate, always-on member support.",
    quarter: 3,
    track: "Booking & Access",
  },
  {
    id: "q3-3",
    title: "Dependent Invitation Flow",
    description:
      "Streamlined process for primary members to invite dependents, empowering the entire household to access care independently.",
    quarter: 3,
    track: "Booking & Access",
  },
  {
    id: "q3-4",
    title: "Premium Outcome Report: Men's Health",
    description:
      "Targeted health outcome reporting focusing on men's health metrics and engagement with preventative care.",
    quarter: 3,
    track: "Personalization",
  },
    {
    id: "q3-5",
    title: "Placeholder: Insurance Q3",
    description:
      "Placeholder",
    quarter: 3,
    track: "Insurance",
  },
  {
    id: "q4-1",
    title: "Adaptive Universal Search",
    description:
      "Intelligent search functionality across all services and providers, making it easier to find care and information.",
    quarter: 4,
    track: "Booking & Access",
  },
  {
    id: "q4-2",
    title: "Dynamic Personalized Dashboard",
    description:
      "Dashboard that adapts layout and content based on member profile and needs, surfacing high-value actions.",
    quarter: 4,
    track: "Personalization",
  },
  {
    id: "q4-3",
    title: "Personalized Care Pathways",
    description:
      "Coordinated care journeys across services (e.g., surgery → physio → mental health) adapting to member progress.",
    quarter: 4,
    track: "Personalization",
  },
  {
    id: "q4-4",
    title: "Premium Outcome Report: Metabolic Health",
    description:
      "Outcome reporting for metabolic health programs, tracking weight management and chronic condition improvements.",
    quarter: 4,
    track: "Personalization",
  },
];

// High Integrity Commitments organized by category
const hicCategories = [
  {
    title: "Health",
    color: "var(--brand-blue-health)", // Blue Health brand color
    commitments: [
      {
        name: "Video Tool Change (Twilio -> Vonage)",
        owner: "Matt Parks",
        primaryPM: "Connor Hsu, Elora Vink",
        startDate: "01 Jan 2026",
        endDate: "31 Mar 2026",
        status: "Green" as const,
        strapline:
          "In progress for mobile and web for SDK integration; in development but shifted completion target date to end of Q1.",
        description:
          "Due to Twilio winding down support for its video tooling, we need to migrate our video chat tool (Vonage) to support our video/audio sessions, as well as chat.",
      },
      {
        name: "Counselling Dashboard Redesign",
        owner: "Matt Parks",
        primaryPM: "Elora Vink",
        startDate: "30 Jan 2026",
        endDate: "01 May 2026",
        status: "Green" as const,
        strapline:
          "Counselling Dashboard is in design finalization and has been scoped out by dev (dev anticipated to start early Feb)",
        description:
          "Redesign counselling dashboard to make appointment booking easier and increase counselling service visibility.",
      },
      {
        name: "CBT GS+ Onboarding 2.0",
        owner: "Matt Parks",
        primaryPM: "William Badger",
        startDate: "15 Oct 2025",
        endDate: "25 Feb 2026",
        status: "Green" as const,
        strapline:
          "On track; timeline extended by one week to align with the release schedule — no impact to overall delivery.",
        description:
          "CBT GS+ Onboarding 2.0 to improve member experience and engagement during initial onboarding.",
      },
      {
        name: "Instant Appointment Booking (Next Available Matching)",
        owner: "Matt Parks",
        primaryPM: "Elora Vink",
        startDate: "13 Jan 2026",
        endDate: "15 Mar 2026",
        status: "Green" as const,
        strapline:
          "This feature is design complete and being scoped out by dev for delivery (spike)",
        description:
          "Allow a user to instantly match with and book an appointment to the next available counselor (individual only).",
      },
      {
        name: "Well-Being - Corporate Challenges",
        owner: "Matt Parks",
        primaryPM: "Hameed Azeez",
        startDate: "01 Sep 2025",
        endDate: "1 Jan 2026",
        status: "Green" as const,
        strapline:
          "On Track - Targeting internal release to Greenshield employees February 1st 2026",
        description:
          "Interactive corporate challenges designed to drive employee engagement, team building, and overall well-being.",
      },
      {
        name: "Pharmacy: Patient Transparency: Integrate with New Order services",
        owner: "Matt Parks",
        primaryPM: "Amy Killoran",
        startDate: "01 Jan 2026",
        endDate: "31 Mar 2026",
        status: "Green" as const,
        strapline:
          "Increased documentation from collaborative  required. Providing requirements to collaborative team to inspire next steps while we wait for access.",
        description:
          "Support patient transparency through integrating GS+ with Rexall 2.0/3.0.",
      },
      {
        name: "API Support for CRM Phase 2",
        owner: "Matt Parks",
        primaryPM: "Connor Hsu",
        startDate: "01 Feb 2026",
        endDate: "31 Mar 2026",
        status: "Green" as const,
        strapline:
          "On track; pending more fulsome update on status/strapline in Feb 2026",
        description:
          "Support from Pod 2 will be developing APIs that can pass information on Care Provider and Appointment Details. Requirements need to be defined better - does not seem like the biggest lift, but depends on complete list of requirements - need this from CRM team.",
      },
      {
        name: "Calendar and Booking Improvements",
        owner: "Matt Parks",
        primaryPM: "Connor Hsu",
        startDate: "01 Aug 2026",
        endDate: "30 Sep 2026",
        status: "Green" as const,
        strapline:
          "On track; pending more fulsome update on status/strapline in Feb 2026",
        description:
          "Project will cover various improvements to our overall calendar and booking flow. re: calendar syncing - requires a lot of backend interaction since availability exists as a backend table - need to determine limitations, acceptable MVP, etc.",
      },
    ],
  },
  {
    title: "Insurance",
    color: "var(--brand-green-insurance)", // Green Insurance brand color
    commitments: [
      {
        name: "Registration Optimization",
        owner: "Kelly Michaelson",
        primaryPM: "Sachin Kumar",
        startDate: "21 Jan 2026",
        endDate: "TBD",
        status: "Green" as const,
        strapline:
          "On track but in initial phase; resourcing and scope being determined by early Q1-26.",
        description:
          "Use Heat Ticket trends to identify and help to resolve registration friction points",
      },
      {
        name: "MGA Travel MVP",
        owner: "Kelly Michaelson",
        primaryPM: "Sachin Kumar",
        startDate: "01 Mar 2025",
        endDate: "25 Feb 2026",
        status: "Green" as const,
        strapline:
          "On track for Feb 25, 2026; currently in business testing.",
        description:
          "A new travel insurance offering (.pkg). Allow individuals to buy travel insurance to the plan offering on to their plan.",
      },
      {
        name: "Define 2026 plan for Travel Product Delivery",
        owner: "Kelly Michaelson",
        primaryPM: "Sachin Kumar",
        startDate: "01 Jan 2025",
        endDate: "31 Mar 2027",
        status: "Green" as const,
        strapline: "On track to launch in Q4-26 / Q1-27",
        description:
          "Requirements need to be defined better - does not seem like the biggest lift, but depends on complete list of requirements - need this from CRM team. Concerns around tech debt for dual access and multiple benefits profiles.",
      },
      {
        name: "Group Conversion",
        owner: "Kelly Michaelson",
        primaryPM: "Sachin Kumar",
        startDate: "01 Jan 2025",
        endDate: "30 Oct 2026",
        status: "Green" as const,
        strapline:
          "On track with early discovery underway; next milestone: finalize data‑transfer solution; no risks raised by partner teams at this stage.",
        description:
          "Strengthening the Votion data management function to ensure compliance with the data requirements to interact with the new Plan Sponsor portal.",
      },
      {
        name: "D2C Website Updates (2026)",
        owner: "Kelly Michaelson",
        primaryPM: "Sachin Kumar",
        startDate: "01 Jan 2026",
        endDate: "01 Oct 2026",
        status: "Green" as const,
        strapline:
          "On track; currently in discovery for next phase of project.",
        description:
          "Launch an updated version of the D2C insurance website (formally known as Choice). Users will view the Coverage & Care model to products and pricing. Will reflect the D2C roadmap.",
      },
    ],
  },
  {
    title: "Administration",
    color: "var(--brand-grey-admin)", // Grey Administration brand color
    commitments: [
      {
        name: "Data Structure logic to support Plan Sponsor portal",
        owner: "Marvin Gurewan",
        primaryPM: "Swati Patel",
        startDate: "01 Jan 2025",
        endDate: "01 Apr 2026",
        status: "Green" as const,
        strapline:
          "Most of Voltron changes have been made to support PSP Health launch, billing division segregation remains",
        description:
          "Strengthening the Votion data management function to ensure compliance with the data requirements to interact with the new Plan Sponsor portal.",
      },
      {
        name: "Plan Advisor Portal",
        owner: "Marvin Gurewan",
        primaryPM: "Swati Patel",
        startDate: "01 Jan 2025",
        endDate: "31 Dec 2026",
        status: "Green" as const,
        strapline:
          "Discovery underway to clarify Advisor Commissions scope across LOBs; financials, resources, and timeline remain green with path to green targeted for 01 Mar 26.",
        description:
          "Plan Advisor Portal with admin features for advisor commissions and management across lines of business.",
      },
      {
        name: "Plan Sponsor Portal",
        owner: "Marvin Gurewan",
        primaryPM: "Swati Patel",
        startDate: "01 Jan 2025",
        endDate: "31 Dec 2026",
        status: "Green" as const,
        strapline:
          "Completed Health build, part of admin build, and now initiating insurance build",
        description:
          "Plan Sponsor portal with admin and internal employee management features that shows which employees have access to benefits and health plans within GS+ Enables HR Managers and admins to view member activity, manage billing, and reporting in one centralized place.",
      },
      {
        name: "iBenefits clients on GS+",
        owner: "Marvin Gurewan",
        primaryPM: "Swati Patel",
        startDate: "01 Jan 2025",
        endDate: "01 Dec 2026",
        status: "Green" as const,
        strapline:
          "On track - ongoing as sales brings in new Admin/Admin + insurance clients onto GS+",
        description:
          "Migration of iBenefits clients onto GS+ platform to improve member experience and administrative efficiency.",
      },
    ],
  },
  {
    title: "GS+",
    color: "var(--brand-dark-green)", // Dark green matching header
    commitments: [
      {
        name: "Dependent Invitation Flow",
        owner: "Jadel McGuire",
        primaryPM: "",
        startDate: "01 Jul 2026",
        endDate: "30 Sep 2026",
        status: "Green" as const,
        strapline:
          "All workstreams healthy with no outstanding issues; delivery confidence remains high",
        description:
          "Streamlined process for primary members to invite dependents, empowering the entire household to access care independently.",
      },
      {
        name: "GS+ Personalized Dashboard",
        owner: "Jadel McGuire, Ifra Jamil",
        primaryPM: "",
        startDate: "01 Jan 2026",
        endDate: "02 Mar 2026",
        status: "Green" as const,
        strapline:
          "On track: currently in design process and on track to be completed in Feb.",
        description:
          "Dashboard that adapts layout and content based on member profile and needs, surfacing high-value actions.",
      },
      {
        name: "Guided Interactions (i.e.Onboarding)",
        owner: "Jadel McGuire, Ifra Jamil",
        primaryPM: "",
        startDate: "01 Apr 2026",
        endDate: "01 Jul 2026",
        status: "Green" as const,
        strapline:
          "On track with design work in progress; next milestone: design completion in early Feb.",
        description:
          "Personalized onboarding, monthly topics, and new launch highlights. Transforms GS+ into a trusted digital front door.",
      },
      {
        name: "Introduce Adaptive, Universal Search Experience in GS+",
        owner: "Jadel McGuire, Ifra Jamil",
        primaryPM: "Jadel McGuire, Ifra Jamil",
        startDate: "01 Jan 2026",
        endDate: "01 Nov 2026",
        status: "Green" as const,
        strapline:
          "The Member Strategy, CX & Health Outcomes Project is in the initiation phase with no risks at this time.",
        description:
          "Implement an adaptive, universal search experience across GS+ that intelligently surfaces relevant services, providers, benefits, and content based on member context and behavior. This search functionality will make it easier for members to find care and information, reducing friction in the member journey.",
      },
      {
        name: "Launch Personalized Care Pathways: Team Based Care Experience within GS+",
        owner: "Matt Parks, Ifra Jamil",
        primaryPM: "Matt Parks, Jadel McGuire",
        startDate: "01 Mar 2026",
        endDate: "31 Dec 2026",
        status: "Green" as const,
        strapline: "On track; not started",
        description:
          "Launch personalized care pathways with team-based care experience integrated within GS+, providing coordinated care journeys and collaborative health management for members.",
      },
      {
        name: "Inspiring Trust through Reliability",
        owner: "Jadel McGuire",
        primaryPM: "Jadel McGuire",
        startDate: "05 Jan 2026",
        endDate: "02 Apr 2026",
        status: "Green" as const,
        strapline:
          "33% complete; on track to deliver Quality Improvement across profile creation systems",
        description:
          "First-impression improvements for iBenefits/admin customers impacted by profile issues. Addressing wait times in call centre, missed calls, and profile issues that drive calls and client complaints. Implementing zero tolerance policy for failed profile creation across B2C, Advantage, iBenefits and Voltron.",
      },
    ],
  },
  {
    title: "Health Outcomes",
    color: "#00A896",
    commitments: [
      {
        name: "Publish quarterly, thematic health outcomes reports focused on ROI and cross-service insights.",
        owner: "Ifra Jamil",
        primaryPM: "Abdul Mohammed",
        startDate: "01 Jan 2026",
        endDate: "31 Dec 2026",
        status: "Green" as const,
        strapline: "On track - Q1 report targeted for March publication, remaining quarterly timing and themes being finalized with MarComm.",
        description: "Product / Market: Pharmacy, CX & Health Outcomes. Timeline from Q1 Jan-26. Owner: Abdul Mohammed / Ifra Jamil. Business Owner:Ifra Jamil. Business Driver: Product Revenue Growth. ID / ShortCode: 10038 / DPIR. External Reference / Alternate Reference: 10381 / -. Program: Member Strategy, CX & Health Outcomes.",
        tier: "3",
        businessDriver: "Product Revenue Growth",
        idShortCode: "10038 / DPIR",
        externalReference: "10381 / -",
        program: "Member Strategy, CX & Health Outcomes",
        productTeamDisplay: "No"
      },
      {
        name: "Deliver an ROI calculator sales tool by Q3 to quantify value and support sales-led decision-making",
        owner: "Ifra Jamil",
        primaryPM: "Abdul Mohammed",
        startDate: "01 Jan 2026",
        endDate: "30 Sep 2026",
        status: "Green" as const,
        strapline: "On track - partnering with Pricing to finalize key inputs and outputs for the prototype.",
        description: "Deliver a sales-focused ROI calculator tool by Q3 2026 to enable sales teams to quantify product value and support data-driven decision-making in client conversations. This tool will help demonstrate the financial impact of GreenShield+ services to prospective and current clients."
      }
    ],
  },
];

// Data & Analytics Priority Projects
const dataAnalyticsProjects = [
  {
    name: "Develop benchmarking metrics for Health and Insurance",
    startDate: "10 Nov 2025",
    endDate: "30 Apr 2026",
    primaryPM: "Daniel Ramirez Garcia",
    owner: "Sovan Sahu, Jonathan Adams, Andrew Mccartney",
    subPortfolio: "Data Analytics",
    description:
      "Provide book of business results to clients so their benefits can be managed accordingly",
    projectOverview:
      "Include benchmark results as a baseline for Clients with Insurance or/and Health",
    businessValue:
      "Provide tools to clients to manage their benefits",
    deliveryPrime: "",
  },
  {
    name: "ODS for CRM Phase 2",
    startDate: "01 May 2025",
    endDate: "31 Jul 2026",
    primaryPM: "Richard Mak",
    owner: "Sovan Sahu",
    subPortfolio: "Data Engineering",
    description:
      "Consolidate operation data from multiple source platforms (Insurance, Health, Admin) and provides real-time data streaming for Contact Center and CRM application needs in CRM phase 2",
    projectOverview: "",
    businessValue:
      "a) Simplified and consolidated view of customer data across multiple service subscriptions\nb) Real-time availability of customer data for Contact Center use cases\nc) Foundation capabilities on operation data streaming for future IT and business application use cases",
    deliveryPrime: "Albert Hu",
  },
  {
    name: "Google HDE Replacement",
    startDate: "15 Sep 2025",
    endDate: "31 Mar 2026",
    primaryPM: "Richard Mak",
    owner: "Sovan Sahu",
    subPortfolio: "Data Engineering",
    description:
      "Development of a solution to replace the GCP Health Data Engine (HDE), which is set to be discontinued on July 11, 2026. The GCP Health Data Engine was a managed service provided by Google that was utilized for the GSC in CRM Phase 1, but Google has decided to deprecate it. After evaluating the options offered by Google, a decision was made to create the replacement solution in-house.",
    projectOverview: "",
    businessValue:
      "Continuity of foundation capabilities to support Care Navigation, Practitioners' Portal & GS Health Data Strategy",
    deliveryPrime: "Nguyen Lang",
  },
  {
    name: "GS+ Individual Conversion rate increase",
    startDate: "05 Jan 2026",
    endDate: "30 Sep 2026",
    primaryPM: "Daniel Ramirez Garcia",
    owner: "",
    subPortfolio: "Data Analytics",
    description:
      "Build and operationalize data required for Group Conversion Digital Experience and improve conversion with the use of predictive and propensity models.",
    projectOverview:
      "% of eligible plan members purchasing individual coverage within 100 days of benefit termination. Increase from current 1.2% to approx. 3-4% conversion rate ($3.6M revenue in 2026)",
    businessValue:
      "Increase Individual conversion. Generate 4.3M of individual Net sales, 3M from DTC and 1.3M from MGA. Insurance - 2026 Featured OKRs",
    deliveryPrime: "Daniel Ramirez Garcia",
  },
  {
    name: "DLP Remediation and Expansion",
    startDate: "01 Jan 2026",
    endDate: "31 Dec 2026",
    primaryPM: "Omar Daudi",
    owner: "",
    subPortfolio: "Data Governance Office",
    description:
      "The DLP Remediation and Expansion project addresses both existing gaps and future protection needs by operationalizing DLP as a consistent enterprise control rather than a set of isolated technical configurations. The project includes: Remediating known DLP weaknesses and posture gaps. Bringing new Health, Insurance, Pharmacy, and Admin data sources under DLP governance. Enhancing data sensitivity detection through extended classifiers. Implementing active protection (MS Purview) mechanisms such as auto-labelling and label-based enforcement. The project is governance-led, with execution supported by IT Security and platform teams where required, ensuring policy intent, technical enforcement, and audit evidence remain aligned.",
    projectOverview:
      "A mandatory Data Governance initiative to strengthen, remediate, and extend Data Loss Prevention controls across GreenShield's Health, Insurance, Admin, and enterprise application platforms. This project consolidates all required DLP-related workstreams into a single governance-led program to ensure: consistent protection of regulated and sensitive data, defensible compliance with privacy and regulatory obligations, and scalable enablement of analytics, automation, and platform modernization. This project is driven by regulatory expectations, audit findings, and contractual obligations and is not discretionary.",
    businessValue:
      "This project delivers business value by: Reducing regulatory and privacy risk - Ensures PII and PHI are consistently protected across all in-scope platforms, supporting compliance with healthcare privacy obligations and broader regulatory requirements. Supporting audit and client assurance - Provides demonstrable, repeatable DLP controls that can be evidenced during audits, client due diligence, and regulator reviews. Protecting enterprise and member trust - Minimizes the risk of data leakage, misuse, or unauthorized access, safeguarding GreenShield's reputation and member confidence. Enabling safe data use and innovation - Allows teams to continue expanding analytics, automation, and digital platforms with confidence that appropriate data protection controls are in place.",
    deliveryPrime: "Debajyoti Kar",
  },
  {
    name: "Build dashboards for PNO (Practitioner Network Operations)",
    startDate: "19 Jan 2026",
    endDate: "18 Dec 2026",
    primaryPM: "Daniel Ramirez Garcia",
    owner: "",
    subPortfolio: "Data Analytics",
    description:
      "Provide insight for our practitioner network, ensuring the availability to have a high-quality service.",
    projectOverview: "",
    businessValue:
      "Reduce cost, increase practitioner availability.",
    deliveryPrime: "",
  },
  {
    name: "GS+ SOC2 Audit",
    startDate: "02 Feb 2026",
    endDate: "01 Dec 2026",
    primaryPM: "Alnoor Mohamed",
    owner: "",
    subPortfolio: "Data Governance Office",
    description:
      "This project covers preparation, execution, and remediation activities required to successfully complete the GS+ SOC2 audit, including evidence coordination, control validation, and audit response management. The Data Governance role will be as a Point of Contact (and coordinator) to all GS Products (and associated Product Owners) in scope for this audit. Ensuring all Product Owners provide the necessary information/evidence needed for a successful audit completion.",
    projectOverview:
      "A mandatory audit initiative to achieve and maintain SOC2 compliance for GS+ Products and related platforms, supporting client trust, regulatory expectations, and enterprise compliance.",
    businessValue:
      "Enables client trust and compliance. Reduces regulatory and reputational risk. Demonstrates maturity of governance and controls",
    deliveryPrime: "Alnoor Mohamed",
  },
  {
    name: "Counselling member journey improvement.",
    startDate: "12 Jan 2026",
    endDate: "27 Mar 2026",
    primaryPM: "Daniel Ramirez Garcia",
    owner: "",
    subPortfolio: "Data Analytics",
    description:
      "Create a Tableau dashboard that provides internal visibility into engagement with our Counselling and Total Health and Life (THL) services. Currently, data exists in client-facing reports, but we lack an internal view optimized for product performance and decision-making.",
    projectOverview: "",
    businessValue:
      "Track engagement and usage trends across services. Enable analysis of user behavior and service adoption. Provide insights to inform product strategy and OKRs.",
    deliveryPrime: "Candace Chan",
  },
  {
    name: "Enable more robust, integrated insights generation to advance health outcomes strategy",
    startDate: "02 Mar 2026",
    endDate: "31 Dec 2026",
    primaryPM: "Daniel Ramirez Garcia",
    owner: "Daniel Ramirez Garcia",
    subPortfolio: "Data Analytics",
    description:
      "Build on the one-time work that was done with Bond Consulting to develop a curated, actionable profile of Member across insurance and health to support Health Outcome, segmentation, targeting and other analytics/reporting.",
    projectOverview:
      "Build on the one-time work that was done with Bond Consulting to develop a curated, actionable profile of Member across insurance and health to support Health Outcome, segmentation, targeting and other analytics/reporting.",
    businessValue:
      "Increase revenue through the implementation of new programs that can be discovered through the customer behavior",
    deliveryPrime: "Daniel Ramirez Garcia",
  },
];

// Deliverable Card Component
function DeliverableCard({
  deliverable,
  index,
}: {
  deliverable: (typeof deliverables)[0];
  index: number;
}) {
  return (
    <div className="mb-32">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
      >
        {/* Content */}
        <div
          className={index % 2 === 1 ? "lg:col-start-2" : ""}
        >
          <div
            className="inline-block px-4 py-2 mb-4"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
              borderRadius: "var(--radius-button)",
            }}
          >
            <span style={{ fontSize: "var(--text-label)" }}>
              {deliverable.quarter}
            </span>
          </div>

          <h2
            className="mb-4"
            style={{
              fontSize: "var(--text-h2)",
              color: "var(--foreground)",
            }}
          >
            {deliverable.title}
          </h2>

          <div className="mb-6">
            <p
              style={{
                fontSize: "var(--text-label)",
                color: "var(--muted-foreground)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Led by {deliverable.director}
            </p>
          </div>

          {/* Problem */}
          <div className="mb-6">
            <h4
              className="mb-3"
              style={{
                fontSize: "var(--text-h4)",
                color: "var(--destructive-foreground)",
              }}
            >
              Problem
            </h4>
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--foreground)",
                lineHeight: "1.7",
              }}
            >
              {deliverable.problem}
            </p>
          </div>

          {/* Opportunity */}
          <div className="mb-6">
            <h4
              className="mb-3"
              style={{
                fontSize: "var(--text-h4)",
                color: "var(--accent)",
              }}
            >
              Opportunity
            </h4>
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--foreground)",
                lineHeight: "1.7",
              }}
            >
              {deliverable.opportunity}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-6">
            <h4
              className="mb-3"
              style={{
                fontSize: "var(--text-h4)",
                color: "var(--secondary-foreground)",
              }}
            >
              Solution
            </h4>
            <ul className="space-y-2">
              {deliverable.solution.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    style={{
                      color: "var(--accent)",
                      marginTop: "4px",
                      fontSize: "var(--text-base)",
                    }}
                  >
                    •
                  </span>
                  <span
                    style={{
                      fontSize: "var(--text-base)",
                      color: "var(--foreground)",
                      lineHeight: "1.7",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metric Card */}
          <div
            className="p-6"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-card)",
              boxShadow: "var(--elevation-sm)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "var(--accent)",
                  borderRadius: "var(--radius)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TrendingUp
                  className="w-6 h-6"
                  style={{ color: "var(--accent-foreground)" }}
                />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "var(--text-h4)",
                    color: "var(--foreground)",
                  }}
                >
                  {deliverable.metric.title}
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p
                  style={{
                    fontSize: "var(--text-label)",
                    color: "var(--muted-foreground)",
                    marginBottom: "4px",
                  }}
                >
                  Start of 25'
                </p>
                <p
                  style={{
                    fontSize: "var(--text-h3)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--foreground)",
                  }}
                >
                  {deliverable.metric.startOfYear}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "var(--text-label)",
                    color: "var(--muted-foreground)",
                    marginBottom: "4px",
                  }}
                >
                  Current
                </p>
                <p
                  style={{
                    fontSize: "var(--text-h3)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--accent)",
                  }}
                >
                  {deliverable.metric.current}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "var(--text-label)",
                    color: "var(--muted-foreground)",
                    marginBottom: "4px",
                  }}
                >
                  Target
                </p>
                <p
                  style={{
                    fontSize: "var(--text-h3)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--chart-2)",
                  }}
                >
                  {deliverable.metric.target}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className={
            index % 2 === 1
              ? "lg:col-start-1 lg:row-start-1"
              : ""
          }
        >
          <div
            style={{
              backgroundColor:
                deliverable.title ===
                "Next Available Counsellor"
                  ? "#ffffff"
                  : "transparent",
              padding:
                deliverable.title ===
                "Next Available Counsellor"
                  ? "12px"
                  : "0",
              borderRadius: "var(--radius-card)",
              boxShadow:
                deliverable.title ===
                "Next Available Counsellor"
                  ? "var(--elevation-sm)"
                  : "none",
              border:
                deliverable.title ===
                "Next Available Counsellor"
                  ? "1px solid var(--border)"
                  : "none",
            }}
          >
            <img
              src={deliverable.image}
              alt={`${deliverable.title} mockup`}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center center",
                borderRadius: "var(--radius-card)",
                boxShadow:
                  deliverable.title ===
                  "Next Available Counsellor"
                    ? "none"
                    : "var(--elevation-sm)",
                border:
                  deliverable.title ===
                  "Next Available Counsellor"
                    ? "none"
                    : "1px solid var(--border)",
                margin: "0 auto",
                display: "block",
                imageRendering: "high-quality",
                maxHeight: "800px",
                minHeight: "400px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "var(--background)",
      }}
    >
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center overflow-hidden min-h-screen"
        style={{
          backgroundColor: "var(--brand-dark-green)",
          padding: "140px var(--spacing-32)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1
            style={{
              fontSize: "48px",
              marginBottom: "16px",
              color: "#ffffff",
            }}
          >
            2026 Product Roadmap
          </h1>
          <p
            style={{
              fontSize: "var(--text-h3)",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "24px",
            }}
          >
            GreenShield+
          </p>
          <ChevronDown
            className="w-8 h-8 mx-auto"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          />
        </div>
      </section>

      {/* Main Content */}
      <div
        className="relative z-10"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto px-8">
          {/* Vision Section */}
          <div
            className="min-h-screen flex items-center justify-center"
            style={{
              paddingTop: "var(--spacing-48)",
              paddingBottom: "var(--spacing-48)",
            }}
          >
            <div className="text-center">
              <h2
                className="mb-6"
                style={{
                  fontSize: "var(--text-h2)",
                  color: "var(--foreground)",
                }}
              >
                Our Vision
              </h2>
              <p
                style={{
                  fontSize: "var(--text-h4)",
                  color: "var(--foreground)",
                  maxWidth: "1000px",
                  margin: "0 auto",
                  lineHeight: "1.7",
                }}
              >
                Our vision is to be known for the best customer
                experience in the payer-provider space. We are
                doubling down on experience — we're not just
                improving usability, we're enabling access to
                care.
                <br />
                <br />
                <strong>
                  Every point of friction is a barrier to
                  health.
                </strong>
              </p>
            </div>
          </div>

          {/* Strategic Priorities */}
          <div
            className="min-h-screen flex items-center"
            style={{
              paddingTop: "var(--spacing-48)",
              paddingBottom: "var(--spacing-48)",
            }}
          >
            <div className="w-full">
              <h2
                className="mb-8"
                style={{
                  fontSize: "var(--text-h2)",
                  color: "var(--foreground)",
                }}
              >
                2026 Enterprise Priorities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Priority 1 */}
                <div
                  className="p-8"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderLeft: "4px solid var(--accent)",
                    borderRadius: "var(--radius-card)",
                    boxShadow: "var(--elevation-sm)",
                  }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: "var(--accent)",
                        borderRadius: "var(--radius)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Trophy
                        className="w-7 h-7"
                        style={{
                          color: "var(--accent-foreground)",
                        }}
                      />
                    </div>
                    <div>
                      <h3
                        className="mb-2"
                        style={{
                          fontSize: "var(--text-h3)",
                          color: "var(--foreground)",
                        }}
                      >
                        Maintain our First Mover Advantage
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span
                        style={{
                          color: "var(--accent)",
                          marginTop: "4px",
                        }}
                      >
                        •
                      </span>
                      <span
                        style={{
                          fontSize: "var(--text-base)",
                          lineHeight: "1.7",
                          color: "var(--foreground)",
                        }}
                      >
                        Continue development of GreenShield+ to
                        maintain market leadership through
                        integrated solutions, including ability
                        to deploy on SaaS basis
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        style={{
                          color: "var(--accent)",
                          marginTop: "4px",
                        }}
                      >
                        •
                      </span>
                      <span
                        style={{
                          fontSize: "var(--text-base)",
                          lineHeight: "1.7",
                          color: "var(--foreground)",
                        }}
                      >
                        Ensure continued product-market fit as
                        we expand our payer-provider
                        capabilities through strong Voice of
                        Customer programs and data-driven
                        decision making at all levels
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Priority 2 */}
                <div
                  className="p-8"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderLeft: "4px solid var(--secondary)",
                    borderRadius: "var(--radius-card)",
                    boxShadow: "var(--elevation-sm)",
                  }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: "var(--secondary)",
                        borderRadius: "var(--radius)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Zap
                        className="w-7 h-7"
                        style={{
                          color: "var(--secondary-foreground)",
                        }}
                      />
                    </div>
                    <div>
                      <h3
                        className="mb-2"
                        style={{
                          fontSize: "var(--text-h3)",
                          color: "var(--foreground)",
                        }}
                      >
                        Establish Technology as a Competitive
                        Advantage
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span
                        style={{
                          color: "var(--secondary)",
                          marginTop: "4px",
                        }}
                      >
                        •
                      </span>
                      <span
                        style={{
                          fontSize: "var(--text-base)",
                          lineHeight: "1.7",
                          color: "var(--foreground)",
                        }}
                      >
                        Store integrated healthcare and
                        insurance data records at plan member
                        level, seeking to integrate data from
                        other private/public partners over time
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        style={{
                          color: "var(--secondary)",
                          marginTop: "4px",
                        }}
                      >
                        •
                      </span>
                      <span
                        style={{
                          fontSize: "var(--text-base)",
                          lineHeight: "1.7",
                          color: "var(--foreground)",
                        }}
                      >
                        Establish GS+ Self-Serve Insights as a
                        valued part of every Insurance and
                        Health contract
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        style={{
                          color: "var(--secondary)",
                          marginTop: "4px",
                        }}
                      >
                        •
                      </span>
                      <span
                        style={{
                          fontSize: "var(--text-base)",
                          lineHeight: "1.7",
                          color: "var(--foreground)",
                        }}
                      >
                        Launch reimagined, enhanced health outcomes reporting with a focused, thematic approach anchored in ROI and cross-service insights.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Innovation Roadmap */}
          <div
            className="min-h-screen flex items-center"
            style={{
              paddingTop: "var(--spacing-48)",
              paddingBottom: "var(--spacing-48)",
            }}
          >
            <div className="w-full">
              <div className="text-center mb-12">
                <h2
                  className="mb-4"
                  style={{
                    fontSize: "var(--text-h2)",
                    color: "var(--foreground)",
                  }}
                >
                  2026 Innovation roadmap
                </h2>
                <p
                  style={{
                    fontSize: "var(--text-base)",
                    color: "var(--muted-foreground)",
                    maxWidth: "700px",
                    margin: "0 auto",
                  }}
                >
                  Our vision for continuous innovation
                  throughout the year
                </p>
              </div>
              <FiveYearRoadmap />
            </div>
          </div>

          {/* 2026 High Integrity Commitments */}
          <section
            className="min-h-screen flex items-center"
            style={{
              paddingTop: "var(--spacing-48)",
              paddingBottom: "var(--spacing-48)",
            }}
          >
            <HICSection
              categories={hicCategories}
              dataAnalyticsProjects={dataAnalyticsProjects}
            />
          </section>

          {/* Deliverables Section */}
          <section
            className="min-h-screen"
            style={{
              paddingTop: "var(--spacing-48)",
              paddingBottom: "var(--spacing-48)",
            }}
          >
            <div className="text-center mb-16">
              <h2
                className="mb-4"
                style={{
                  fontSize: "42px",
                  color: "var(--foreground)",
                }}
              >
                Major Deliverables
              </h2>
              <p
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--muted-foreground)",
                  maxWidth: "700px",
                  margin: "0 auto",
                }}
              >
                Six strategic initiatives designed to transform
                the customer experience
              </p>
            </div>

            {deliverables.map((deliverable, index) => (
              <DeliverableCard
                key={index}
                deliverable={deliverable}
                index={index}
              />
            ))}
          </section>

          {/* HIC Timeline - Gantt Chart */}
          <section
            className="min-h-screen flex items-center"
            style={{
              paddingTop: "var(--spacing-48)",
              paddingBottom: "var(--spacing-48)",
            }}
          >
            <div className="w-full">
              <div className="text-center mb-12">
                <h2
                  className="mb-4"
                  style={{
                    fontSize: "var(--text-h2)",
                    color: "var(--foreground)",
                  }}
                >
                  HIC Timeline Overview
                </h2>
                <p
                  style={{
                    fontSize: "var(--text-base)",
                    color: "var(--muted-foreground)",
                    maxWidth: "700px",
                    margin: "0 auto",
                  }}
                >
                  Visual timeline of all High Integrity
                  Commitments across 2025-2027
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "var(--card)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--border)",
                  padding: "32px",
                  boxShadow: "var(--elevation-sm)",
                }}
              >
                <HICGanttChart
                  categories={hicCategories}
                  dataAnalyticsProjects={dataAnalyticsProjects}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}