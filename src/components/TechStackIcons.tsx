import { 
    siReact, siNodedotjs, siTailwindcss, siTypescript, 
    siPhp, siLaravel, siExpress, siFigma, siVuedotjs,
    siBootstrap, siMysql, siPostgresql, siDbeaver, siTermius, 
    siHtml5, siJavascript, siCss3, siGit, siGithub, siGitlab,
    siPostman
} from "simple-icons";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const techIcons = [
    siReact, siNodedotjs, siTailwindcss, siTypescript, siPhp, 
    siLaravel, siExpress, siFigma, siVuedotjs, siBootstrap,
    siMysql, siPostgresql, siDbeaver, siTermius, siHtml5, 
    siJavascript, siCss3, siGit, siGithub, siGitlab, siPostman
];

const TechStackIcons = () => {
    return (
        <TooltipProvider>
            <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-6">
            {techIcons.map((icon) => (
                <Tooltip key={icon.title} >
                    <TooltipTrigger className="flex justify-center items-center align-middle place-items-center content-center ">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path 
                            d={icon.path} 
                            fill={`#${icon.hex}`} 
                            className="dark:fill-neutral-50" 
                        />
                        </svg>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-sm font-semibold">{icon.title}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
            </div>
        </TooltipProvider>
    );
};

export default TechStackIcons;