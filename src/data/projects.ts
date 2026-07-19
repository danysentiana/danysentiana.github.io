import marissaImage from "@/assets/projects/marissa.webp";
import bayarajaImage from "@/assets/projects/bayaraja.webp";
import rakitWeb from "@/assets/projects/rakit-web.webp";
import coopinImage from "@/assets/projects/coopin.webp";
import kutImage from "@/assets/projects/kinarya-tech.webp";
import kamilaImage from "@/assets/projects/kamila.webp";
import bisaDesignImage from "@/assets/projects/bisa-design.webp";
import stobarImage from "@/assets/projects/stobar.webp";
import trastImage from "@/assets/projects/trast.webp";
import fmcImage from "@/assets/projects/fmc.webp";
import pmImage from "@/assets/projects/pm.webp";

// projects data
const projects = [
  {
    id: 1,
    title: "[Rakit] Website Profile",
    description: "A company profile website, built to showcase services, contact info, and key company details.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: rakitWeb,
    link: "http://www.rakitaja.com/",
    details: {
      images: [rakitWeb],
      description: "Detailed case study for [Rakit] Website Profile is coming soon — overview, key features, and technical decisions will be added here.",
    },
  },
  {
    id: 2,
    title: "BayarAja",
    description: "Node.js/Express back-office admin for a mobile airtime/PPOB top-up distribution network — manages stock allocation, deposits, and multi-level approvals.",
    techStack: ["Express", "Node.js", "Bootstrap", "MySQL"],
    image: bayarajaImage,
    link: "https://adminbayaraja.kiselindonesia.com/",
    details: {
      images: [bayarajaImage],
      description: "BayarAja Web Admin is an internal back-office system for a telecom top-up (pulsa/PPOB) distribution business. It tracks inventory and stock allocation across outlets and clusters, manages deposit/saldo (balance) transactions, runs multi-step approval workflows for stock and payment reconciliation, and exports operational reports to Excel/PDF. No README purpose statement existed beyond a one-line rebuild note, so this is inferred from module names (allocation, stock_opname, saldo, coin, DOA, PPOB, Odoo integration), route structure, and role-based query filters (cluster/tap ids) seen in the controllers.",
    },
  },
  {
    id: 3,
    title: "Marissa",
    description: "Full-featured HRIS for an Indonesian company: attendance, leave, payroll, KPI, and approval workflows for HR and employees.",
    techStack: ["Laravel", "Bootstrap", "MySQL"],
    image: marissaImage,
    link: "https://marissa.kiselindonesia.com/",
    details: {
      images: [marissaImage],
      description: "A large-scale Laravel HR Information System covering the employee lifecycle: attendance/clock-in via a mobile API, leave and overtime requests, payroll generation (including BPJS, THR, incentives), KPI scoring, exit clearance/termination processing, and social assistance (bansos) tracking. It serves both an admin/HR web panel (500+ routes) and a companion mobile app authenticated via API tokens. Built as an internal operations tool, not a public product, with heavy Indonesian-language domain terminology (Karyawan, Cuti, Absensi, Jabatan) throughout.",
    },
  },
  {
    id: 4,
    title: "[Rakit] Coopin",
    description: "A dashboard for managing cooperative activities, including member data, transactions, reports, etc.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: coopinImage,
    link: "https://dashboardcoopin.kinarya-tech.com/",
    details: {
      images: [coopinImage],
      description: "Detailed case study for [Rakit] Coopin is coming soon — overview, key features, and technical decisions will be added here.",
    },
  },
  {
    id: 5,
    title: "[Rakit] Trast",
    description: "A management system for drivers, vehicles, users, and car pooling operations",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: trastImage,
    link: "https://trast.kinarya-tech.com/",
    details: {
      images: [trastImage],
      description: "Detailed case study for [Rakit] Trast is coming soon — overview, key features, and technical decisions will be added here.",
    },
  },
  {
    id: 6,
    title: "Kinarya Tech Company Profile",
    description: "Node.js/Express company-profile site for IT & telco firm KUT — landing, portfolio, pricing, blog pages.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: kutImage,
    link: "http://38.47.90.39:8200/",
    details: {
      images: [kutImage],
      description: "Server-rendered company profile website for KUT, an IT/telco services company (web dev, network monitoring, telco infrastructure, mobile apps, repeater solutions). Built with Express and EJS templating, MySQL via Knex for data, and a REST-ish JSON API layer for dynamic content like the portfolio grid. Scope covers the public marketing site plus lightweight account flows (password reset/change) and JWT-based auth for those flows.",
    },
  },
  {
    id: 7,
    title: "Kamila",
    description: "A web based HRIS dashboard for managing employees, payroll, and other HR activities.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: kamilaImage,
    link: "https://kamila.ptkam.co.id/",
    details: {
      images: [kamilaImage],
      description: "Detailed case study for Kamila is coming soon — overview, key features, and technical decisions will be added here.",
    },
  },
  {
    id: 8,
    title: "Stobar (Thesis Project)",
    description: "A stock management system for retail stores, built to track inventory and manage stock levels.",
    techStack: ["PHP", "Javascript", "Bootstrap", "MySQL"],
    image: stobarImage,
    link: "https://gitlab.com/dsentiana/stobar",
    details: {
      images: [stobarImage],
      description: "Detailed case study for Stobar is coming soon — overview, key features, and technical decisions will be added here.",
    },
  },
  {
    id: 9,
    title: "Bisa Design",
    description: "An online design learning platform, certification, and publishing features for aspiring designers.",
    techStack: ["Laravel", "Javascript", "Bootstrap"],
    image: bisaDesignImage,
    link: "https://bisa.design/",
    details: {
      images: [bisaDesignImage],
      description: "Detailed case study for Bisa Design is coming soon — overview, key features, and technical decisions will be added here.",
    },
  },
  {
    id: 10,
    title: "FMC",
    description: "A dashboard for managing regional activities, including member data, transactions, reports, etc.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: fmcImage,
    link: "https://admin-fmc.kinarya-tech.com/",
    details: {
      images: [fmcImage],
      description: "Detailed case study for FMC is coming soon — overview, key features, and technical decisions will be added here.",
    },
  },
  {
    id: 11,
    title: "Project Management",
    description: "A management system for project management, including member data, transactions, reports, etc.",
    techStack: ["Laravel", "Javascript", "Bootstrap"],
    image: pmImage,
    link: "https://projectmanagement.kinarya-tech.com/login",
    details: {
      images: [pmImage],
      description: "Detailed case study for Project Management is coming soon — overview, key features, and technical decisions will be added here.",
    },
  },
];

export { projects };
