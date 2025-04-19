import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { 
  siReact, siNodedotjs, siLaravel, siExpress, siBootstrap, 
  siMysql, siTailwindcss, 
  siJavascript,
  siPhp
} from "simple-icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import useIsTouchDevice from "@/hooks/useIsTouchDevice";

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link: string;
  image: string;
}

const techStackIcons: Record<string, { hex: string; svg: string }> = {
  React: siReact,
  "Node.js": siNodedotjs,
  Laravel: siLaravel,
  Express: siExpress,
  Bootstrap: siBootstrap,
  MySQL: siMysql,
  "Tailwind CSS": siTailwindcss,
  Javascript: siJavascript,
  PHP: siPhp
};

const ProjectCard = ({ title, description, techStack, link, image }: ProjectProps) => {
  const isTouch = useIsTouchDevice(); // ✅ Now inside component, valid usage

  return (
    <Card className="rounded-2xl shadow-md dark:bg-neutral-900 overflow-hidden pt-0 pb-3">
      <CardHeader className="p-0">
        <img 
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <CardTitle className="text-xl font-semibold px-4 font-roboto">{title}</CardTitle>
      </CardHeader>
      <CardContent className="-mt-4 px-0">
        <div className="px-4">
          <p className="text-gray-600 dark:text-gray-300">{description}</p>

          <div className="md:min-h-7">
            <div className="mt-3 flex flex-wrap gap-2">
              {techStack.map((tech) => {
                const icon = techStackIcons[tech];
                const iconSvg = icon && (
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    dangerouslySetInnerHTML={{ __html: icon.svg }}
                    className="text-gray-500 dark:text-gray-300 transition-colors duration-200 ease-in-out"
                    style={{
                      "--hover-color": `#${icon.hex}`,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => (e.currentTarget.style.color = `#${icon.hex}`)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  />
                );

                return (
                  <span
                    key={tech}
                    className="flex items-center gap-1 px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 rounded-md"
                  >
                    {isTouch || !icon ? (
                      iconSvg
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>{iconSvg}</TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm font-semibold">{tech}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end mt-5 md:mt-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button className="font-light rounded-md" size="sm">
                    <a href={link} target="_blank">
                      <Link />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm font-semibold">View Project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default ProjectCard;
