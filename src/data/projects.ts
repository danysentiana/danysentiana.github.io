import { 
  siReact, siNodedotjs, siLaravel, siExpress, 
  siBootstrap, siMysql, siTypescript, siTailwindcss
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
];

import marissaImage from "@/assets/projects/marissa.png";
import bayarajaImage from "@/assets/projects/bayaraja.png";
import rakitWeb from "@/assets/projects/rakit-web.png";

// projects data
const projects = [
  {
    id: 1,
    title: "Rakit Website",
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
];

export { techStack, projects };

