import marissaImage from "@/assets/projects/marissa.png";
import bayarajaImage from "@/assets/projects/bayaraja.png";
import rakitWeb from "@/assets/projects/rakit-web.png";
import coopinImage from "@/assets/projects/coopin.png";
import kutImage from "@/assets/projects/kinarya-tech.png";
import kamilaImage from "@/assets/projects/kamila.png";
import bisaDesignImage from "@/assets/projects/bisa-design.png";
import stobarImage from "@/assets/projects/stobar.png";
import trastImage from "@/assets/projects/trast.png";
import fmcImage from "@/assets/projects/fmc.png";
import pmImage from "@/assets/projects/pm.png";

// projects data
const projects = [
  {
    id: 1,
    title: "[Rakit] Website Profile",
    description: "A company profile website, built to showcase services, contact info, and key company details.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: rakitWeb, 
    link: "http://www.rakitaja.com/",
  },
  {
    id: 2,
    title: "BayarAja",
    description: "An admin dashboard for manages users, transactions, and reports efficiently.",
    techStack: ["Express", "Node.js", "Bootstrap", "MySQL"],
    image: bayarajaImage,
    link: "https://adminbayaraja.kiselindonesia.com/",
  },
  {
    id: 3,
    title: "Marissa",
    description: "A web based HRIS dashboard for managing employees, payroll, and other HR activities.",
    techStack: ["Laravel", "Bootstrap", "MySQL"],
    image: marissaImage,
    link: "https://marissa.kiselindonesia.com/",
  },
  {
    id: 4,
    title: "[Rakit] Coopin",
    description: "A dashboard for managing cooperative activities, including member data, transactions, reports, etc.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: coopinImage,
    link: "https://dashboardcoopin.kinarya-tech.com/",
  },
  {
    id: 5,
    title: "[Rakit] Trast",
    description: "A management system for drivers, vehicles, users, and car pooling operations",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: trastImage,
    link: "https://trast.kinarya-tech.com/",
  },
  {
    id: 6,
    title: "Kinarya Tech Company Profile",
    description: "A company profile website, built to showcase services, contact info, and key company details.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: kutImage,
    link: "http://38.47.90.39:8200/",
  },
  {
    id: 7,
    title: "Kamila",
    description: "A web based HRIS dashboard for managing employees, payroll, and other HR activities.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: kamilaImage,
    link: "https://kamila.ptkam.co.id/",
  },
  {
    id: 8,
    title: "Stobar (Thesis Project)",
    description: "A stock management system for retail stores, built to track inventory and manage stock levels.",
    techStack: ["PHP", "Javascript", "Bootstrap", "MySQL"],
    image: stobarImage,
    link: "https://gitlab.com/dsentiana/stobar",
  },
  {
    id: 9,
    title: "Bisa Design",
    description: "An online design learning platform, certification, and publishing features for aspiring designers.",
    techStack: ["Laravel", "Javascript", "Bootstrap"],
    image: bisaDesignImage,
    link: "https://bisa.design/",
  },
  {
    id: 10,
    title: "FMC",
    description: "A dashboard for managing regional activities, including member data, transactions, reports, etc.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: fmcImage,
    link: "https://admin-fmc.kinarya-tech.com/",
  },
  {
    id: 11,
    title: "Project Management",
    description: "A management system for project management, including member data, transactions, reports, etc.",
    techStack: ["Laravel", "Javascript", "Bootstrap"],
    image: pmImage,
    link: "https://projectmanagement.kinarya-tech.com/login",
  },
];

export { projects };