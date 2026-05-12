"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode
} from "react";

type CardItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags?: string[];
};

type LinkItem = {
  href: string;
  icon: string;
  title: string;
  description: string;
};

type ExperienceItem = {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
};

type ContentSection = {
  id: string;
  eyebrow: string;
  heading: ReactNode;
  sub: string;
  items: CardItem[];
  columns?: "cols-2" | "cols-3" | "cols-4";
  className?: string;
  style?: CSSProperties;
  modalEyebrow?: string;
};

type ActiveModal =
  | {
      kind: "card";
      eyebrow: string;
      title: string;
      sub: string;
    }
  | {
      kind: "experience";
      eyebrow: string;
      title: string;
      sub: string;
      description: string;
    };

type Particle = {
  sx: number;
  sy: number;
  sz: number;
  size: number;
  c: [number, number, number];
  x: number;
  y: number;
  vz: number;
  rad: number;
};

const stats = [
  ["10+", "Years Billing, AR & Credentialing"],
  ["100+", "Providers Credentialed"],
  ["30%", "Claim Denials Reduced"],
  ["95%", "Clean Claim Capability"]
];

const contentSections: ContentSection[] = [
  {
    id: "positioning",
    eyebrow: "Positioning",
    heading: (
      <>
        The billing mind
        <br />
        <span className="dim">behind the operation.</span>
      </>
    ),
    sub: "The profile is not positioned as a generic biller. It is positioned as a founder-led reimbursement operating system covering medical billing, dental billing, DME, provider enrollment, AR clean-up, payer follow-up, appeals, offshore support and training.",
    items: [
      {
        id: "position",
        icon: "🧭",
        title: "Reimbursement Architect",
        description:
          "A senior phrase that describes Ali as the person who designs the financial recovery system, not only performs billing tasks."
      },
      {
        id: "proof",
        icon: "🏆",
        title: "Proof-Based Specialist",
        description:
          "Claims, credentialing, AR, payment posting, denials, appeals, dental workflows, DME documentation and Microsoft healthcare operations."
      },
      {
        id: "offer",
        icon: "⚕️",
        title: "Provider Growth Partner",
        description:
          "For US practices that need cash acceleration, payer enrollment, billing clean-up and offshore support without losing control."
      }
    ]
  },
  {
    id: "services",
    eyebrow: "Medical Billing Services",
    heading: (
      <>
        From claim creation
        <br />
        <span className="dim">to cash recovery.</span>
      </>
    ),
    sub: "The full operating model covers front-end verification, mid-cycle coding and claims, and back-end AR recovery with reporting discipline.",
    style: { background: "var(--d3)" },
    items: [
      {
        id: "svcClaims",
        icon: "🧾",
        title: "Medical Billing & Claims",
        description:
          "Eligibility, VOB, coding checks, charge entry, clearinghouse rejects, payer submission, correction and resubmission.",
        tags: ["CPT", "ICD-10", "HCPCS", "CMS-1500"]
      },
      {
        id: "svcCredentialing",
        icon: "🪪",
        title: "Credentialing & Enrollment",
        description:
          "NPI, CAQH, payer enrollment, Medicare/Medicaid workflows, license validation, panel participation and expiry calendars.",
        tags: ["NPI", "CAQH", "Payers", "Compliance"]
      },
      {
        id: "svcAR",
        icon: "📞",
        title: "AR Follow-Up & Recovery",
        description:
          "Aging buckets, payer calls, portal follow-ups, denial triage, recovery prioritization, appeals and payment posting reconciliation.",
        tags: ["30/60/90/120+", "Appeals", "Posting"]
      },
      {
        id: "svcDenials",
        icon: "🛡️",
        title: "Denials & Appeals",
        description:
          "Eligibility, auth, coding, timely filing, COB, medical necessity, missing documentation, same/similar and payer policy denials.",
        tags: ["Appeal Packets", "Evidence", "Policy Proof"]
      },
      {
        id: "svcDental",
        icon: "🦷",
        title: "Dental Billing RCM",
        description:
          "Dental claims, daily provider reporting, payment posting, denied dental claims, insurance communication and practice cash visibility.",
        tags: ["Dental Claims", "Los Gatos", "DBS"]
      },
      {
        id: "svcDME",
        icon: "♿",
        title: "DME Billing",
        description:
          "HCPCS mapping, modifiers, prior authorization, proof of delivery, rental vs purchase logic, same/similar checks and DME denial loops.",
        tags: ["POD", "RR/NU/MS", "Auth"]
      },
      {
        id: "svcLabs",
        icon: "🧪",
        title: "Labs & Pharma RCM",
        description:
          "Consent intake, provider verification, chain-of-custody, CPT/HCPCS mapping, ICD-10 medical necessity and proof of service.",
        tags: ["Labs", "Pharma", "Consent"]
      },
      {
        id: "svcAI",
        icon: "🤖",
        title: "AI-First Billing Operations",
        description:
          "Workflow engines, dashboards, claim quality bots, collections assist, training logs, QA controls and data-driven governance.",
        tags: ["Dashboards", "Bots", "QA"]
      },
      {
        id: "svcTraining",
        icon: "🎓",
        title: "Billing Training & Placement",
        description:
          "12-week US medical billing curriculum, software exposure, capstone, career guidance and job-ready workforce development.",
        tags: ["12 Weeks", "NAVTTC", "Placement"]
      }
    ]
  },
  {
    id: "ecosystem",
    eyebrow: "Healthcare Billing Ecosystem",
    heading: (
      <>
        One specialist.
        <br />
        <span className="dim">Multiple proof assets.</span>
      </>
    ),
    sub: "All healthcare properties are positioned as one connected trust system for US providers, dental practices, DME companies, telehealth groups, labs and billing outsourcing partners.",
    items: [
      {
        id: "mha",
        icon: "🏥",
        title: "My Health Aiyin",
        description:
          "Medical billing, RCM, credentialing, AR, claims processing, eligibility verification, electronic claims and offshore billing delivery."
      },
      {
        id: "mus",
        icon: "🏛️",
        title: "MedBilling Unified Solutions",
        description:
          "US-facing medical billing brand for practice onboarding, billing transformation, revenue cycle clean-up and provider support."
      },
      {
        id: "showcase",
        icon: "📣",
        title: "Showcase My Health",
        description:
          "Presentation and credibility layer for provider conversations, service education, proof points and healthcare RCM positioning."
      },
      {
        id: "smile",
        icon: "🦷",
        title: "The Smile Factory DBS",
        description:
          "Dedicated dental billing service platform focused on claim processing, denial management, dental coding and daily practice reporting."
      },
      {
        id: "care",
        icon: "🎧",
        title: "Care My Health Aiyin",
        description:
          "Support BPO layer for US healthcare: patient communication, intake, documentation chase, billing coordination and back-office support."
      },
      {
        id: "popl",
        icon: "📲",
        title: "My Health Aiyin Popl",
        description:
          "Mobile-first digital business card for outreach, conferences, provider calls, WhatsApp follow-ups and LinkedIn introductions."
      }
    ]
  },
  {
    id: "systems",
    eyebrow: "Operating System",
    heading: (
      <>
        A complete
        <br />
        <span className="dim">billing backbone.</span>
      </>
    ),
    sub: "Medical, dental, DME, labs and pharma billing tracks run on one disciplined pipeline: eligibility -> documentation -> coding -> clearinghouse -> payer -> posting -> AR -> appeals -> reporting.",
    className: "light-sec",
    items: [
      {
        id: "pipeline",
        icon: "🔁",
        title: "6-Step Core Pipeline",
        description:
          "Appointment and eligibility, VOB, accreditation, credentialing, documentation, coding, clearinghouse and resubmission."
      },
      {
        id: "tiers",
        icon: "📈",
        title: "6-Tier AR Recovery Model",
        description:
          "Receipt visibility, AR follow-up, denial management, long-term recovery, appeals and A.R.C.H.I.V.E final escalation."
      },
      {
        id: "reporting",
        icon: "📊",
        title: "Executive Reporting",
        description:
          "Daily cash, weekly reconciliation, month-end close, aging, denials, clean claim percentage, appeals and write-off analysis."
      }
    ]
  },
  {
    id: "platforms",
    eyebrow: "Software & Platform Command",
    heading: (
      <>
        Billing credibility
        <br />
        <span className="dim">built on systems.</span>
      </>
    ),
    sub: "Ali is positioned not only as a biller, but as a reimbursement systems operator: the specialist who connects EHRs, clearinghouses, payer portals, coding tools, Microsoft cloud, dashboards, and AI-first workflow controls into one accountable medical billing machine.",
    items: [
      {
        id: "platEhr",
        icon: "🖥️",
        title: "EHR & Billing Software",
        description:
          "Practice EHR, Kareo, eClinicalWorks, Office Ally, AdvancedMD, Athenahealth, NextGen, Medisoft, Cerner and Epic literacy positioned for claim readiness."
      },
      {
        id: "platClaims",
        icon: "🧾",
        title: "Claims, Coding & Clearinghouse Stack",
        description:
          "CPT, ICD-10, HCPCS, CDT, modifiers, CMS-1500, 277CA rejects, 835/ERA, EOBs, payer portals, Codify and denial intelligence."
      },
      {
        id: "platMicrosoft",
        icon: "☁️",
        title: "Microsoft Cloud for RCM",
        description:
          "Azure, Microsoft 365, Teams, SharePoint, Power Platform, Dynamics 365, Azure DevOps and security-first collaboration for distributed billing teams."
      },
      {
        id: "platAI",
        icon: "🤖",
        title: "AI-First Billing Enablement",
        description:
          "Claim quality bots, collections assist, workflow engines, dashboards, data platforms, UAT, change control and post-release monitoring."
      },
      {
        id: "platDashboards",
        icon: "📊",
        title: "Dashboards & Financial Controls",
        description:
          "Daily cash, clean-claim rate, denial analysis, aging, appeal outcomes, payment posting, write-off analysis and executive visibility."
      },
      {
        id: "platSecurity",
        icon: "🔐",
        title: "Compliance & Access Controls",
        description:
          "HIPAA-safe communications, access provisioning, incident reporting, training logs, data minimization, audit trails and role-based operations."
      }
    ]
  },
  {
    id: "credentials",
    eyebrow: "Education & Certifications",
    heading: (
      <>
        Clinical revenue work
        <br />
        <span className="dim">with enterprise discipline.</span>
      </>
    ),
    sub: "The authority comes from a rare blend: engineering precision, MBA-level business strategy, Microsoft cloud certifications, product discipline and hands-on healthcare billing delivery.",
    className: "light-sec",
    items: [
      {
        id: "eduNust",
        icon: "⚙️",
        title: "BS Mechatronics Engineering",
        description:
          "NUST engineering foundation applied to process control, automation thinking, system design and billing workflow architecture."
      },
      {
        id: "eduUet",
        icon: "📐",
        title: "MS Engineering Management",
        description:
          "UET Taxila management training linked to KPI governance, process optimization, operating cadence and revenue cycle controls."
      },
      {
        id: "eduSjsu",
        icon: "🎓",
        title: "MBA / Business Strategy",
        description:
          "San Jose State MBA layer applied to provider growth, operational strategy, financial visibility and healthcare business conversations."
      },
      {
        id: "certAzure",
        icon: "☁️",
        title: "Microsoft Azure Certifications",
        description:
          "AZ-900, AI-900, DP-900, PL-900, MS-900, SC-900 and Dynamics 365 fundamentals aligned to healthcare cloud operations."
      },
      {
        id: "certProduct",
        icon: "🧩",
        title: "Product & Project Discipline",
        description:
          "Product management, UAT, backlog governance, roadmap planning, Azure DevOps and workflow optimization for healthcare teams."
      },
      {
        id: "certHealthcare",
        icon: "⚕️",
        title: "Healthcare Billing Competency",
        description:
          "Medical billing, coding, credentialing, denials, DME, dental RCM and offshore billing team training."
      }
    ]
  },
  {
    id: "affiliations",
    eyebrow: "Affiliations & Authority Layer",
    heading: (
      <>
        Healthcare RCM
        <br />
        <span className="dim">connected to institutions.</span>
      </>
    ),
    sub: "Education, alumni networks, standards bodies, healthcare brands, Microsoft-aligned capabilities and public proof assets create a broader trust layer for provider conversations.",
    items: [
      {
        id: "affCETEM",
        icon: "🏛️",
        title: "CETEM",
        description:
          "Centre for Emerging Technology and Engineering Management connection for systems, engineering and leadership credibility."
      },
      {
        id: "affSEPM",
        icon: "📘",
        title: "SEPM",
        description:
          "Software engineering and project management proof asset connected to workflow design and delivery discipline."
      },
      {
        id: "affQCCD",
        icon: "🌍",
        title: "QCCD Qatar",
        description:
          "Quality and compliance-linked credibility layer for international provider and institutional conversations."
      },
      {
        id: "affBeaconhouse",
        icon: "🎒",
        title: "Beaconhouse Alumni",
        description:
          "Alumni network link preserved as part of the broader Ali Bin Nadeem identity and relationship layer."
      },
      {
        id: "affLinkedIn",
        icon: "🔗",
        title: "LinkedIn Presence",
        description: "Professional visibility, outreach and provider trust-building channel."
      },
      {
        id: "affPopl",
        icon: "📲",
        title: "Digital Business Cards",
        description:
          "Ali Bin Nadeem Popl and My Health Aiyin Popl for mobile networking, conferences and follow-up."
      }
    ]
  },
  {
    id: "training",
    eyebrow: "Training & Workforce",
    heading: (
      <>
        From specialist
        <br />
        <span className="dim">to workforce builder.</span>
      </>
    ),
    sub: "The NAVTTC proposal positions My Health Aiyin as a structured US medical billing training engine capable of preparing Pakistan-based talent for global healthcare outsourcing.",
    className: "light-sec",
    items: [
      {
        id: "curriculum",
        icon: "📚",
        title: "12-Week Curriculum",
        description:
          "RCM, HIPAA, coding, claims, credentialing, AR, software, capstone and placement guidance."
      },
      {
        id: "capacity",
        icon: "🏫",
        title: "1,920-2,400 Annual Capacity",
        description:
          "Two cycles/year, 96 annual batches, 20-25 students per batch and scalable workforce design."
      },
      {
        id: "market",
        icon: "🌍",
        title: "Pakistan-to-US Workforce",
        description:
          "A structured pathway for remote healthcare billing employment and provider service delivery."
      }
    ]
  }
];

const links: LinkItem[] = [
  {
    href: "https://myhealthaiyin.framer.ai/",
    icon: "🏥",
    title: "My Health Aiyin",
    description: "Medical billing, credentialing, AR, denials, eligibility and claims processing."
  },
  {
    href: "https://musamyhealth.com/",
    icon: "🏛️",
    title: "MedBilling Unified Solutions",
    description: "US-oriented billing and revenue cycle solutions brand."
  },
  {
    href: "https://showcasemyhealth.framer.ai/",
    icon: "📣",
    title: "Showcase My Health",
    description: "Healthcare capability showcase for provider education and trust-building."
  },
  {
    href: "https://thesmilefactorydbs.com/",
    icon: "🦷",
    title: "The Smile Factory DBS",
    description: "Dental billing, denial management, coding and claims processing."
  },
  {
    href: "https://poplme.co/myhealthaiyin",
    icon: "📲",
    title: "My Health Aiyin Popl",
    description: "Mobile networking card for healthcare RCM conversations and provider outreach."
  },
  {
    href: "https://ed-command-center.vercel.app/",
    icon: "🖥️",
    title: "ED Command Center",
    description: "Emergency department command center project for healthcare operations visibility."
  },
  {
    href: "https://alibinnadeem-ai.github.io/aiclinicaldocsdemo/",
    icon: "🎙️",
    title: "AI Clinical Documentation System",
    description: "Real-time voice recording with AI-powered SOAP note generation."
  },
  {
    href: "https://drive.google.com/file/d/15MklJEg9suXGiOYbaO7ZaE6wxas1X2ks/view?usp=sharing",
    icon: "📈",
    title: "Strategic Investment Proposal",
    description:
      "Revolutionizing medical billing services for scalable growth and operational excellence."
  },
  {
    href: "https://hipaa-compliance-as-a-bu-jwtl9wh.gamma.site/",
    icon: "🔐",
    title: "HIPAA Compliance as a Business Associate",
    description: "Business associate compliance presentation for healthcare operations."
  },
  {
    href: "https://drive.google.com/file/d/15EB4I6j0nSDDChSo15kzsKJC270RSbFl/view?usp=sharing",
    icon: "📘",
    title: "MHA Unified Services & Operations Playbook",
    description: "My Health Aiyin playbook for unified services and operating workflows."
  },
  {
    href: "https://drive.google.com/file/d/1ML-rja5MyW0iAcc0Vl5GJ2OHAxAoa2K3/view?usp=sharing",
    icon: "🏢",
    title: "My Health Aiyin Company Profile",
    description: "Company profile and healthcare service overview for My Health Aiyin."
  },
  {
    href: "https://drive.google.com/file/d/1KLITVTXgCtDcGe1ikpF5Od2vhTxeJSBv/view?usp=sharing",
    icon: "📋",
    title: "My Health Aiyin Client Portal User Guide",
    description: "Detailed user guide for the My Health Aiyin client portal demo."
  },
  {
    href: "https://drive.google.com/file/d/1chRt7BhlNCKwLoeirZm1w7juuyg9W3Kf/view?usp=sharing",
    icon: "⚡",
    title: "My Health Aiyin Quick Reference",
    description: "Quick reference guide for My Health Aiyin services and workflows."
  },
  {
    href: "https://drive.google.com/drive/folders/1bMqEy1IHyZpOL2k8Dqdn2qnXHLyfSU82",
    icon: "⛓️",
    title: "HIPAA on Chain",
    description: "Drive folder for HIPAA on-chain compliance materials and reference assets."
  }
];

const experience: ExperienceItem[] = [
  {
    id: "expMHA",
    date: "Dec 2021 - Present",
    role: "Senior Credentialing & Billing Specialist",
    company: "My Health Aiyin - USA",
    description:
      "Full-cycle AR, medical billing, claims submission, credentialing, denial management and financial operations for mental health, dental and DME providers."
  },
  {
    id: "expMeda",
    date: "Feb 2018 - Dec 2019",
    role: "Billing & AR Specialist",
    company: "Med Aiyin - USA",
    description:
      "Led AR operations, complex claim management, payment posting, reconciliation, insurance verification and prior authorization."
  },
  {
    id: "expDental",
    date: "Jan 2016 - Jan 2018",
    role: "Senior Dental Billing Specialist",
    company: "The Smile Factory DBS / Los Gatos Dental Center",
    description:
      "Managed dental billing, claims submissions, payment posting, denied-claim follow-up and daily provider reporting."
  },
  {
    id: "expMS",
    date: "2020 - 2021",
    role: "Healthcare Workforce & Product Advisor",
    company: "Microsoft - Teams, M365, Azure DevOps",
    description:
      "Healthcare workforce management, Teams adoption, Azure/M365 training and healthcare workflow optimization."
  }
];

const footerColumns = [
  {
    title: "Healthcare Brands",
    links: [
      ["https://myhealthaiyin.framer.ai/", "My Health Aiyin"],
      ["https://musamyhealth.com/", "MedBilling Unified Solutions"],
      ["https://showcasemyhealth.framer.ai/", "Showcase My Health"],
      ["https://care.myhealth.aiyin.us", "Care My Health Aiyin"],
      ["https://thesmilefactorydbs.com/", "The Smile Factory DBS"],
      ["https://poplme.co/myhealthaiyin", "My Health Aiyin Popl"]
    ]
  },
  {
    title: "Billing Software",
    links: [
      ["#platforms", "Practice EHR - Kareo - eCW"],
      ["#platforms", "Office Ally - AdvancedMD"],
      ["#platforms", "Athenahealth - NextGen - Medisoft"],
      ["#platforms", "Epic - Cerner familiarity"],
      ["#platforms", "CMS-1500 - 277CA - ERA/835"],
      ["#platforms", "Codify - CPT - ICD-10 - HCPCS"]
    ]
  },
  {
    title: "Microsoft & Cloud",
    links: [
      ["#credentials", "Azure Fundamentals AZ-900"],
      ["#credentials", "Azure AI AI-900"],
      ["#credentials", "Azure Data DP-900"],
      ["#credentials", "Power Platform PL-900"],
      ["#credentials", "Microsoft 365 MS-900"],
      ["#credentials", "Security SC-900"],
      ["#credentials", "Dynamics 365 CRM / ERP"]
    ]
  },
  {
    title: "Education & Affiliations",
    links: [
      ["https://nust.edu.pk", "NUST Engineering"],
      ["https://www.uettaxila.edu.pk", "UET Taxila MS"],
      ["https://www.sjsu.edu", "San Jose State MBA"],
      ["https://cetem.canisrufus.org", "CETEM"],
      ["http://sepm.alibinnadeem.com", "SEPM"],
      ["http://qccd.net", "QCCD Qatar"]
    ]
  },
  {
    title: "Connect",
    links: [
      ["https://www.linkedin.com/in/alibinnadeem/", "LinkedIn"],
      ["https://poplme.co/alibinnadeem", "Ali Bin Nadeem Popl"],
      ["mailto:alibinnadeem.official@gmail.com", "Email"],
      ["https://wa.me/14085001113", "+1 408 500 1113"],
      ["https://wa.me/923200000039", "+92 320 000 0039"],
      ["https://beaconhousealumni.org", "Beaconhouse Alumni"]
    ]
  }
];

export function BillingSite() {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  const [leadStatus, setLeadStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    return () => document.documentElement.classList.remove("js");
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const canvasElement = canvas;
    const heroElement = hero;
    const context = ctx;

    const particles: Particle[] = [];
    const particleLinks: [number, number][] = [];
    const particleCount = 3200;
    const linkCount = 60;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let time = 0;
    let frame = 0;

    function resize() {
      canvasWidth = canvasElement.width = heroElement.clientWidth;
      canvasHeight = canvasElement.height = heroElement.clientHeight;
      canvasElement.style.width = `${canvasWidth}px`;
      canvasElement.style.height = `${canvasHeight}px`;
    }

    function init() {
      particles.length = 0;
      particleLinks.length = 0;

      for (let i = 0; i < particleCount; i += 1) {
        const radius = 20 + Math.random() * 80;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const q = Math.random();

        particles.push({
          sx: radius * Math.sin(phi) * Math.cos(theta),
          sy: radius * Math.sin(phi) * Math.sin(theta),
          sz: radius * Math.cos(phi) - 30,
          size: Math.random() * 2.5 + 0.55,
          c:
            q < 0.5
              ? [Math.round((0.16 + q * 0.5) * 255), Math.round((0.6 + q * 0.2) * 255), 255]
              : [153, 204, 255],
          x: 0,
          y: 0,
          vz: 0,
          rad: 0
        });
      }

      for (let i = 0; i < linkCount; i += 1) {
        particleLinks.push([
          Math.floor(Math.random() * particleCount),
          Math.floor(Math.random() * particleCount)
        ]);
      }
    }

    function project() {
      time += 0.003;
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      const ry = time * 0.12 + targetX * 0.3;
      const rx = time * 0.05 + targetY * 0.15;
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const focal = canvasHeight / 1.1547;

      for (const particle of particles) {
        const x1 = particle.sx * cy + particle.sz * sy;
        const z1 = -particle.sx * sy + particle.sz * cy;
        const y2 = particle.sy * cx - z1 * sx;
        const z2 = particle.sy * sx + z1 * cx;
        const viewZ = 60 - z2;
        const scale = focal / viewZ;

        particle.x = canvasWidth / 2 + x1 * scale;
        particle.y = canvasHeight / 2 - y2 * scale;
        particle.vz = viewZ;
        particle.rad = Math.min(particle.size * (220 / viewZ) * 0.22, 2.4);
      }
    }

    function drawParticle(particle: Particle) {
      const alpha = Math.max(0, Math.min(0.6, (220 / particle.vz) * 0.12));
      const radius = Math.max(0.6, particle.rad * 1.8);
      const gradient = context.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        radius
      );
      const [red, green] = particle.c;

      gradient.addColorStop(0, `rgba(${red},${green},255,${0.8 * alpha})`);
      gradient.addColorStop(0.4, `rgba(${red},${green},255,${0.55 * alpha})`);
      gradient.addColorStop(0.75, `rgba(${red},${green},255,${0.12 * alpha})`);
      gradient.addColorStop(1, `rgba(${red},${green},255,0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      context.fill();
    }

    function drawCore() {
      const gradient = context.createRadialGradient(
        canvasWidth / 2,
        canvasHeight / 2,
        0,
        canvasWidth / 2,
        canvasHeight / 2,
        Math.min(canvasWidth, canvasHeight) * 0.18
      );

      gradient.addColorStop(0, "rgba(110,231,255,.24)");
      gradient.addColorStop(0.4, "rgba(41,151,255,.10)");
      gradient.addColorStop(1, "rgba(41,151,255,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function animate() {
      frame = requestAnimationFrame(animate);
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      project();
      drawCore();
      context.globalCompositeOperation = "lighter";
      context.lineWidth = 0.4;
      context.strokeStyle = "rgba(41,151,255,.04)";

      for (const link of particleLinks) {
        const a = particles[link[0]];
        const b = particles[link[1]];
        if (a.vz < 8 || b.vz < 8) continue;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      particles.sort((a, b) => b.vz - a.vz);
      for (const particle of particles) drawParticle(particle);
      context.globalCompositeOperation = "source-over";
    }

    function handleMouseMove(event: globalThis.MouseEvent) {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    }

    resize();
    init();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const dotElement = dot;
    const ringElement = ring;

    let cursorX = 0;
    let cursorY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    function handleMouseMove(event: globalThis.MouseEvent) {
      cursorX = event.clientX;
      cursorY = event.clientY;
      dotElement.style.left = `${cursorX}px`;
      dotElement.style.top = `${cursorY}px`;
    }

    function handleMouseOver(event: globalThis.MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("a,button,.card,.ti")) return;

      ringElement.style.width = "56px";
      ringElement.style.height = "56px";
      ringElement.style.borderColor = "rgba(41,151,255,.9)";
      dotElement.style.background = "var(--sky)";
    }

    function handleMouseOut(event: globalThis.MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("a,button,.card,.ti")) return;

      ringElement.style.width = "36px";
      ringElement.style.height = "36px";
      ringElement.style.borderColor = "rgba(41,151,255,.6)";
      dotElement.style.background = "#fff";
    }

    function animateCursor() {
      ringX += (cursorX - ringX) * 0.12;
      ringY += (cursorY - ringY) * 0.12;
      ringElement.style.left = `${ringX}px`;
      ringElement.style.top = `${ringY}px`;
      frame = requestAnimationFrame(animateCursor);
    }

    animateCursor();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const parent = entry.target.parentElement;
          const siblings = parent ? [...parent.querySelectorAll(".rev")] : [];
          const index = siblings.indexOf(entry.target);

          window.setTimeout(() => {
            entry.target.classList.add("vis");
          }, Math.max(index, 0) * 30);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -10px 0px" }
    );

    document.querySelectorAll(".rev").forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const heroInner = heroInnerRef.current;
    if (!heroInner) return;
    const heroInnerElement = heroInner;

    function handleScroll() {
      if (window.scrollY < window.innerHeight) {
        heroInnerElement.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveModal(null);
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  function handleCardMove(event: ReactMouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);

    if (window.innerWidth > 767) {
      card.style.transform = `perspective(800px) rotateX(${-(y - 0.5) * 14}deg) rotateY(${
        (x - 0.5) * 14
      }deg) translateZ(8px) scale(1.02)`;
    }
  }

  function handleCardLeave(event: ReactMouseEvent<HTMLElement>) {
    event.currentTarget.style.transform = "";
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setIsSubmitting(true);
    setLeadStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(json.error || "Request failed");
      }

      setLeadStatus("Request sent. Ali will follow up.");
      form.reset();
    } catch (error) {
      setLeadStatus(
        error instanceof Error
          ? error.message
          : "Could not send from this preview. Email alibinnadeem.official@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function openCardModal(eyebrow: string, item: CardItem) {
    setActiveModal({
      kind: "card",
      eyebrow,
      title: item.title,
      sub: item.description
    });
  }

  function openExperienceModal(item: ExperienceItem) {
    setActiveModal({
      kind: "experience",
      eyebrow: "Experience",
      title: item.role,
      sub: item.company,
      description: item.description
    });
  }

  return (
    <>
      <div ref={dotRef} id="cur-dot" />
      <div ref={ringRef} id="cur-ring" />

      <nav id="gnav" aria-label="Primary navigation">
        <a className="logo" href="#hero">
          Ali Bin Nadeem <span>- Medical Billing</span>
        </a>
        <ul>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#ecosystem">Ecosystem</a>
          </li>
          <li>
            <a href="#systems">System</a>
          </li>
          <li>
            <a href="#platforms">Platforms</a>
          </li>
          <li>
            <a href="#credentials">Credentials</a>
          </li>
          <li>
            <a href="#affiliations">Affiliations</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <a className="ncta" href="https://poplme.co/myhealthaiyin" target="_blank" rel="noreferrer">
          My Health Card
        </a>
      </nav>

      <main>
        <section ref={heroRef} id="hero">
          <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true" />
          <div className="hero-grid" />
          <div ref={heroInnerRef} className="hero-inner">
            <p className="h-ey">Medical Billing - Credentialing - AR - Denials - Dental - DME</p>
            <h1>
              <span className="accent">Reimbursement</span>
              <br />
              Architect.
            </h1>
            <div className="hero-sub-title">Claims. Credentialing. Collections.</div>
            <p className="hs">
              Ali Bin Nadeem is positioned as a healthcare reimbursement architect for US
              providers: a hands-on medical billing, credentialing, AR recovery, denial management,
              dental billing, DME billing and AI-first operations specialist who can both run the
              revenue cycle and build the team, workflow, dashboard and training system behind it.
            </p>
            <div className="hctas">
              <a className="bp" href="https://poplme.co/myhealthaiyin" target="_blank" rel="noreferrer">
                Open My Health Aiyin Card
              </a>
              <a className="bg" href="#services">
                Explore Billing Services
              </a>
              <a className="bg" href="https://myhealthaiyin.framer.ai/" target="_blank" rel="noreferrer">
                Visit My Health Aiyin
              </a>
            </div>
          </div>
          <div className="scroll-h">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        <div id="stats">
          {stats.map(([value, label]) => (
            <div className="si rev" key={label}>
              <span className="sn">{value}</span>
              <span className="sl">{label}</span>
            </div>
          ))}
        </div>

        {contentSections.map((section) => (
          <section
            id={section.id}
            className={`tile ${section.className || ""}`.trim()}
            style={section.style}
            key={section.id}
          >
            <div className="tc rev">
              <span className="eyebrow">{section.eyebrow}</span>
              <h2 className="th">{section.heading}</h2>
              <p className="tsub">{section.sub}</p>
            </div>
            <div className={`grid ${section.columns || "cols-3"} perspective-grid`}>
              {section.items.map((item) => (
                <button
                  type="button"
                  className="card card-button rev"
                  key={item.id}
                  onClick={() => openCardModal(section.modalEyebrow || section.eyebrow, item)}
                  onMouseMove={handleCardMove}
                  onMouseLeave={handleCardLeave}
                >
                  <span className="ico">{item.icon}</span>
                  <div className="ct">{item.title}</div>
                  <div className="cd">{item.description}</div>
                  {item.tags ? (
                    <div className="tags">
                      {item.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="cl">Explore -&gt;</div>
                </button>
              ))}
            </div>
          </section>
        ))}

        <section id="experience" className="tile">
          <div className="tc rev">
            <span className="eyebrow">Experience Timeline</span>
            <h2 className="th">
              Built inside
              <br />
              <span className="dim">real practices.</span>
            </h2>
            <p className="tsub">
              Hands-on billing execution plus technology leadership is what makes this profile
              stronger than a traditional biller, coder or AR caller.
            </p>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <button
                type="button"
                className="ti timeline-button rev"
                key={item.id}
                onClick={() => openExperienceModal(item)}
              >
                <div className="date">{item.date}</div>
                <div className="tbody">
                  <div className="role">{item.role}</div>
                  <div className="co">{item.company}</div>
                  <div className="desc">{item.description}</div>
                  <span className="tlink">View details -&gt;</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="links" className="tile">
          <div className="tc rev">
            <span className="eyebrow">Original Links Preserved</span>
            <h2 className="th">
              Healthcare first.
              <br />
              <span className="dim">Portfolio intact.</span>
            </h2>
            <p className="tsub">
              The page promotes the healthcare billing identity first while retaining the broader
              original credibility links, healthcare proof assets and provider-facing contact
              channels.
            </p>
          </div>
          <div className="grid cols-2">
            {links.map((item) => (
              <a
                className="card rev"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                key={item.href}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
              >
                <span className="ico">{item.icon}</span>
                <div className="ct">{item.title}</div>
                <div className="cd">{item.description}</div>
                <div className="cl">open</div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact">
          <div className="contact-inner">
            <h2 className="rev">
              Ready to
              <br />
              recover
              <br />
              <span className="grd">more cash?</span>
            </h2>
            <p className="rev">
              For medical billing, credentialing, AR clean-up, dental billing, DME claims, denials,
              appeals, provider enrollment, billing audits or a complete offshore healthcare billing
              team.
            </p>
            <form className="lead-form rev" onSubmit={handleLeadSubmit}>
              <input className="lead-input" name="name" required placeholder="Name" />
              <input className="lead-input" name="email" required type="email" placeholder="Email" />
              <input
                className="lead-input lead-wide"
                name="service"
                placeholder="Service needed"
              />
              <textarea
                className="lead-input lead-wide lead-textarea"
                name="message"
                required
                placeholder="Tell me what you need help with"
                rows={4}
              />
              <button className="bp lead-wide" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Billing Request"}
              </button>
              <p className="lead-status" aria-live="polite">
                {leadStatus}
              </p>
            </form>
            <div className="clinks rev">
              <a className="bp" href="https://poplme.co/myhealthaiyin" target="_blank" rel="noreferrer">
                My Health Aiyin Card
              </a>
              <a className="bg" href="https://myhealthaiyin.framer.ai/" target="_blank" rel="noreferrer">
                Website
              </a>
              <a className="bg" href="https://wa.me/14085001113" target="_blank" rel="noreferrer">
                WhatsApp / US Line
              </a>
              <a className="bg" href="mailto:alibinnadeem.official@gmail.com">
                Email
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="fi">
          {footerColumns.map((column) => (
            <div className="fc" key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map(([href, label]) => (
                  <li key={`${column.title}-${label}`}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="fb">
          <span>© 2026 Ali Bin Nadeem - Reimbursement Architect</span>
          <span>
            US Medical Billing - Credentialing - AR - Denials - Dental - DME - AI-First Billing
            Operations
          </span>
        </div>
      </footer>

      <div
        id="modal-bg"
        className={activeModal ? "open" : ""}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveModal(null);
        }}
      >
        <div id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div id="modal-close">
            <button type="button" aria-label="Close modal" onClick={() => setActiveModal(null)}>
              x
            </button>
          </div>
          {activeModal ? (
            <div id="modal-body">
              <div className="mb-ey">{activeModal.eyebrow}</div>
              <div className="mb-h" id="modal-title">
                {activeModal.title}
              </div>
              <div className="mb-sub">{activeModal.sub}</div>

              {activeModal.kind === "experience" ? (
                <>
                  <div className="mb-sec">
                    <h4>Scope</h4>
                    <p>{activeModal.description}</p>
                  </div>
                  <div className="mb-stat">
                    <div className="mb-stat-i">
                      <div className="n">30%</div>
                      <div className="l">Denials Reduced</div>
                    </div>
                    <div className="mb-stat-i">
                      <div className="n">95%</div>
                      <div className="l">Clean Claim Capability</div>
                    </div>
                    <div className="mb-stat-i">
                      <div className="n">100+</div>
                      <div className="l">Providers Credentialed</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-sec">
                    <h4>Positioning</h4>
                    <p>{activeModal.sub}</p>
                  </div>
                  <div className="mb-sec">
                    <h4>Operational value</h4>
                    <ul>
                      <li>Designed for US provider reimbursement conversations</li>
                      <li>Supports billing, credentialing, AR, denials, reporting and offshore team delivery</li>
                      <li>
                        Connects process, platform, compliance and financial visibility into one
                        operating model
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
