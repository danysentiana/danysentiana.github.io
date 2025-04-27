import { Briefcase, GraduationCap, LucideIcon } from "lucide-react"

export type JourneyItem = {
    id: number;
    title: string;
    date: string;
    description: string;
    type: "Internship" | "Full Time" | "Education";
    companyOrSchool: string;
    icon: LucideIcon;
};
  
export const journeyData: JourneyItem[] = [
    {
        id: 1,
        title: "Frontend Developer",
        date: "Feb 2022 - Jul 2022",
        description: "Rebuilding a design training website with new technologies and adding new features.",
        type: "Internship",
        companyOrSchool: "PT Bisa Artifisial Indonesia",
        icon: Briefcase,
    },
    {
        id: 2,
        title: "Bachelor's Degree",
        date: "Aug 2018 - Jan 2023",
        description: "Learning everything about Information System such as web development, mobile development, database, UI/UX, project management, etc.",
        type: "Education",
        companyOrSchool: "Veteran Jakarta University",
        icon: GraduationCap,
    },
    {
        id: 3,
        title: "Fullstack IT Bootcamp",
        date: "Feb 2024 - Jul 2024",
        description: "Selected to join Fullstack IT Bootcamp by PT Lawencon International to learn more about fullstack web development.",
        type: "Education",
        companyOrSchool: "PT Lawencon International",
        icon: GraduationCap,
    },
    {
        id: 4,
        title: "Fullstack Web Developer",
        date: "Jul 2024 - Present",
        description: "Currently working as a Fullstack Web Developer at Kisel Group.",
        type: "Full Time",
        companyOrSchool: "Kisel Group",
        icon: Briefcase,
    },
];
  