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

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
  } from "@/components/ui/popover";

import useIsTouchDevice from "@/hooks/useIsTouchDevice";

const techIcons = [
    siReact, siNodedotjs, siTailwindcss, siTypescript, siPhp, 
    siLaravel, siExpress, siFigma, siVuedotjs, siBootstrap,
    siMysql, siPostgresql, siDbeaver, siTermius, siHtml5, 
    siJavascript, siCss3, siGit, siGithub, siGitlab, siPostman
];

const TechStackIcons = () => {
    const isTouch = useIsTouchDevice();
    
    return (
        <div className="mt-8 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 gap-6 border rounded-2xl p-6">
            {techIcons.map((icon) => (
                <div key={icon.title} className="flex justify-center items-center align-middle place-items-center content-center">
                    {isTouch ? (
                        <Popover>
                            <PopoverTrigger>
                                <svg 
                                    className="w-10 h-10 md:w-12 md:h-12"
                                    viewBox="0 0 24 24" 
                                    fill="none"
                                >
                                    <path 
                                        d={icon.path} 
                                        fill={`#${icon.hex}`} 
                                        className="dark:fill-neutral-50" 
                                    />
                                </svg>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto px-2 py-1 text-sm font-semibold rounded-md">
                                {icon.title}
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <svg 
                                        className="w-10 h-10 md:w-12 md:h-12"
                                        viewBox="0 0 24 24" 
                                        fill="none"
                                    >
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
                        </TooltipProvider>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TechStackIcons;