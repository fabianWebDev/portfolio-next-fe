"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import TechTag from "./TechTag";
import Link from "next/link";
type ProjectCardProps = {
    id: number;
    name: string;
    image: string;
    short_description: string;
    technologies: string[];
    project_type: string;
};

type ProjectTypeColors = {
    badge: string;
    dot: string;
};

function getProjectTypeColors(projectType: string): ProjectTypeColors {
    const normalizedType = projectType.toLowerCase();

    if (
        normalizedType.includes("landing-page")
    ) {
        return {
            badge: "bg-cyan-500/20 text-cyan-300",
            dot: "bg-cyan-300",
        };
    }

    if (normalizedType.includes("institutional")) {
        return {
            badge: "bg-lime-500/20 text-lime-300",
            dot: "bg-lime-300",
        };
    }

    if (normalizedType.includes("e-commerce")) {
        return {
            badge: "bg-violet-500/20 text-violet-300",
            dot: "bg-violet-300",
        };
    }

    return {
        badge: "bg-blue-500/20 text-blue-300",
        dot: "bg-blue-300",
    };
}

export default function ProjectCard({
    id,
    name,
    image,
    short_description,
    technologies,
    project_type,
}: ProjectCardProps) {
    const router = useRouter();
    const projectTypeColors = getProjectTypeColors(project_type);

    return (
        <Link href={`/projects/${id}`}>
        <article className="flex h-full flex-col gap-4 rounded-sm border-2 border-gray-200 bg-gray-50 p-2 md:p-4 dark:border-purple-900/20 dark:bg-transparent md:p-5 dark:hover:bg-purple-600/10 dark:hover:border-purple-500 transition-all duration-300 dark:hover:scale-101">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-gray-200 dark:bg-neutral-800">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 40vw, 100vw"
                />
            </div>
            <div className="flex gap-2 min-h-0 min-w-0 flex-1 flex-col justify-between">
                <div className="flex flex-col gap-2 min-w-0">
                    {project_type && (
                        <div className="flex items-center">
                            <span
                                className={`rounded-full px-2 py-1 text-xs ${projectTypeColors.badge}`}
                            >
                                <span
                                    className={`mr-2 inline-block h-2 w-2 rounded-full ${projectTypeColors.dot}`}
                                />
                                {project_type}
                            </span>
                        </div>
                    )}
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
                        {name}
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                            <TechTag key={technology} name={technology} />
                        ))}
                    </ul>
                    <p className="text-md dark:text-neutral-200">
                        {short_description}
                    </p>
                </div>
                <div className="flex shrink-0">
                    <Button
                        onClick={() => router.push(`/projects/${id}`)}
                        variant="text"
                    >
                        View project
                    </Button>
                </div>
            </div>
        </article>
        </Link>
    );
}
