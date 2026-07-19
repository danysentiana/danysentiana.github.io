import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { techStackIconMap } from "@/data/techIcons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import useIsTouchDevice from "@/hooks/useIsTouchDevice";

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
}

const ProjectCard = ({ id, title, description, techStack, image }: ProjectProps) => {
  const [expanded, setExpanded] = useState(false);
  const isTouch = useIsTouchDevice();

  const content = (
    <RouterLink to={`/projects/${id}`} className="block">
    <motion.div
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    >
    <Card className="rounded-2xl shadow-md dark:bg-neutral-900 overflow-hidden pt-0 pb-3 hover:shadow-xl dark:hover:shadow-neutral-800/50 transition-shadow duration-300">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-48 object-cover"
        />
        <CardTitle className="text-xl font-semibold px-4 font-roboto">{title}</CardTitle>
      </CardHeader>
      <CardContent className="-mt-4 px-0">
        <div className="px-4">
          <p
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setExpanded(!expanded);
            }}
            className={`text-gray-600 dark:text-gray-300 text-sm md:text-base cursor-pointer transition-all duration-300 ease-in-out ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {description}
          </p>

          <div className="md:min-h-7">
            <div className="mt-3 flex flex-wrap gap-2">
              {techStack.map((tech) => {
                const icon = techStackIconMap[tech];

                if (!icon) {
                  return (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-md text-gray-500 dark:text-gray-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {tech}
                    </span>
                  );
                }

                const iconSvg = (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gray-500 dark:text-gray-300 transition-colors duration-200 ease-in-out"
                    style={{
                      "--hover-color": `#${icon.hex}`,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => (e.currentTarget.style.color = `#${icon.hex}`)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <path d={icon.path} />
                  </svg>
                );

                return (
                  <span
                    key={tech}
                    className="flex items-center gap-1 px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 rounded-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isTouch ? (
                      <Popover>
                        <PopoverTrigger asChild>{iconSvg}</PopoverTrigger>
                        <PopoverContent side="bottom" className="w-auto px-2 py-1 text-sm font-semibold rounded-md">
                          {tech}
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>{iconSvg}</TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm font-semibold">{tech}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </motion.div>
    </RouterLink>
  );

  if (isTouch) return content;

  return <TooltipProvider delayDuration={0}>{content}</TooltipProvider>;
};
export default ProjectCard;
