"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
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
    const thumbRef = useRef<HTMLDivElement>(null);
    const [thumbH, setThumbH] = useState(0);
    const router = useRouter();
    useLayoutEffect(() => {
        const el = thumbRef.current;
        if (!el) return;
        const update = () => setThumbH(el.getBoundingClientRect().height);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <article className="flex flex-col gap-4 rounded border-2 border-gray-200 bg-gray-50 p-4 dark:border-purple-600 dark:bg-transparent md:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-4">
                <div
                    ref={thumbRef}
                    className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-sm bg-gray-200 dark:bg-neutral-800 sm:aspect-auto sm:h-44 sm:w-[30%] sm:min-h-[11rem]"
                    style={
                        thumbH > 0
                            ? ({ "--thumb-h": `${thumbH}px` } as CSSProperties)
                            : undefined
                    }
                >
                    <Image
                        src={image}
                        alt={name}
                        width={1200}
                        height={2400}
                        className={
                            thumbH > 0
                                ? "absolute left-0 top-0 h-auto w-full max-w-none animate-pan-y-scroll"
                                : "absolute left-0 top-0 h-auto w-full max-w-none"
                        }
                        sizes="(min-width: 640px) 30vw, 100vw"
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-2">
                    <div className="flex min-w-0 flex-col">
                        {project_type && (
                            <div className="flex items-center mb-1">
                                <span className="rounded-full bg-blue-500/50 text-blue-300 text-xs px-2 py-1">
                                    <span className="w-2 h-2 rounded-full bg-blue-300 inline-block mr-2">
                                    </span>
                                    {project_type}
                                </span>
                            </div>
                        )}
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {name}
                        </h2>
                        <ul className="flex flex-wrap gap-2 mt-2">
                            {technologies.map((technology) => (
                                <li key={technology}>
                                    <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-800 dark:bg-neutral-700 dark:text-gray-200">
                                        {technology}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {short_description}
                        </p>
                    </div>
                    <div className="flex shrink-0">
                        <Button
                            onClick={() => router.push(`/projects/${id}`)}
                            variant="outline"
                        >
                            View project
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
