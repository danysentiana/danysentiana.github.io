import { 
  siReact, siNodedotjs, siTailwindcss, siTypescript, 
  siPhp, siLaravel, siExpress, siFigma, siVuedotjs,
  siBootstrap, siMysql, siPostgresql, siDbeaver, siTermius, 
  siHtml5, siJavascript, siCss3, siGit, siGithub, siGitlab,
  siPostman
} from "simple-icons";

// All tech icons for the Tech Stack section
export const allTechIcons = [
  siReact, siNodedotjs, siTailwindcss, siTypescript, siPhp, 
  siLaravel, siExpress, siFigma, siVuedotjs, siBootstrap,
  siMysql, siPostgresql, siDbeaver, siTermius, siHtml5, 
  siJavascript, siCss3, siGit, siGithub, siGitlab, siPostman
];

// Icon lookup map for project tech stacks
export const techStackIconMap: Record<string, { hex: string; path: string; title: string }> = {
  React: siReact,
  "Node.js": siNodedotjs,
  Laravel: siLaravel,
  Express: siExpress,
  Bootstrap: siBootstrap,
  MySQL: siMysql,
  "Tailwind CSS": siTailwindcss,
  TypeScript: siTypescript,
  Javascript: siJavascript,
  PHP: siPhp,
};