import { 
  siReact, siNodedotjs, siLaravel, siExpress, 
  siBootstrap, siMysql, siTypescript, siTailwindcss, siPhp, siJavascript
} from "simple-icons";

const techStack = [
  { name: "React", icon: siReact },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Laravel", icon: siLaravel },
  { name: "Express", icon: siExpress },
  { name: "Bootstrap", icon: siBootstrap },
  { name: "MySQL", icon: siMysql },
  { name: "TypeScript", icon: siTypescript },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "PHP", icon: siPhp },
  { name: "Javascript", icon: siJavascript },
];

import clearenceImage from "@/assets/projects/Clarence.png";
import marissaImage from "@/assets/projects/marissa.png";
import bayarajaImage from "@/assets/projects/bayaraja.png";
import rakitWeb from "@/assets/projects/rakit-web.png";
import coopinImage from "@/assets/projects/coopin.png";
import kutImage from "@/assets/projects/kinarya-tech.png";
import kamilaImage from "@/assets/projects/kamila.png";
import bisaDesignImage from "@/assets/projects/bisa-design.png";
import stobarImage from "@/assets/projects/stobar.png";

// projects data
const projects = [
  {
    id: 1,
    title: "[Rakit] Website Profile",
    description: "A personal website built with React and Tailwind CSS.",
    techStack: ["React", "Tailwind CSS"],
    image: rakitWeb, 
    link: "http://www.rakitaja.com/",
  },
  {
    id: 2,
    title: "BayarAja",
    description: "A full-stack e-commerce application with Next.js and Stripe.",
    techStack: ["Express", "Node.js", "Bootstrap", "MySQL"],
    image: bayarajaImage,
    link: "https://adminbayaraja.kiselindonesia.com/",
  },
  {
    id: 3,
    title: "Marissa",
    description: "A simple task management app using Laravel and Vue.",
    techStack: ["Laravel", "Bootstrap", "MySQL"],
    image: marissaImage,
    link: "https://marissa.kiselindonesia.com/",
  },
  {
    id: 4,
    title: "[Rakit] Coopin",
    description: "A simple task management app using Laravel and Vue.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: coopinImage,
    link: "https://dashboardcoopin.kinarya-tech.com/",
  },
  {
    id: 5,
    title: "[Rakit] Trast",
    description: "A simple task management app using Laravel and Vue.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: clearenceImage,
    link: "https://trast.kinarya-tech.com/",
  },
  {
    id: 6,
    title: "Kinarya Tech Company Profile",
    description: "A simple task management app using Laravel and Vue.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: kutImage,
    link: "http://38.47.90.39:8200/",
  },
  {
    id: 7,
    title: "Kamila",
    description: "A simple task management app using Laravel and Vue.",
    techStack: ["Node.js", "Express", "Bootstrap", "MySQL"],
    image: kamilaImage,
    link: "https://kamila.ptkam.co.id/",
  },
  {
    id: 8,
    title: "Stobar",
    description: "A simple task management app using Laravel and Vue.",
    techStack: ["PHP", "Javascript", "Bootstrap", "MySQL"],
    image: stobarImage,
    link: "",
  },
  {
    id: 9,
    title: "Bisa Design",
    description: "A simple task management app using Laravel and Vue.",
    techStack: ["Laravel", "Javascript", "Bootstrap"],
    image: bisaDesignImage,
    link: "https://bisa.design/",
  },
];

export { techStack, projects };

