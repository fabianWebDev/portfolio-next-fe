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

export default function ProjectCard({
    id,
    name,
    image,
    short_description,
    technologies,
    project_type,
}: ProjectCardProps) {
    const router = useRouter();

    return (
        <Link href={`/projects/${id}`}>
        <article className="flex h-full flex-col gap-4 rounded border-2 border-gray-200 bg-gray-50 p-4 dark:border-purple-600/20 dark:bg-transparent md:p-5 dark:hover:bg-purple-600/10 dark:hover:border-purple-500 transition-all duration-300">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-200 dark:bg-neutral-800">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 40vw, 100vw"
                />
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-2">
                <div className="flex min-w-0 flex-col">
                    {project_type && (
                        <div className="mb-1 flex items-center">
                            <span className="rounded-full bg-blue-500/50 px-2 py-1 text-xs text-blue-300">
                                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-300" />
                                {project_type}
                            </span>
                        </div>
                    )}
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                        {name}
                    </h2>
                    <ul className="mt-2 flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                            <TechTag key={technology} name={technology} />
                        ))}
                    </ul>
                    <p className="mt-2 text-md dark:text-neutral-200">
                        {short_description}
                    </p>
                </div>
                <div className="flex shrink-0">
                    <Button
                        onClick={() => router.push(`/projects/${id}`)}
                        variant="main"
                    >
                        View project
                    </Button>
                </div>
            </div>
        </article>
        </Link>
    );
}
