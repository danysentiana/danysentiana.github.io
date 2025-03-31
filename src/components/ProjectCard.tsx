import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link: string;
}

const ProjectCard = ({ title, description, techStack, link }: ProjectProps) => {
  return (
    <Card className="rounded-2xl shadow-md dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
        <div className="mt-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-md mr-2"
            >
              {tech}
            </span>
          ))}
        </div>
        <Button asChild className="mt-4">
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
