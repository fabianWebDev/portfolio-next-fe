"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

type ProjectCardProps = {
    id: number;
    name: string;
    image: string;
    short_description: string;
    technologies: string[];
};

export default function ProjectCard({
    id,
    name,
    image,
    short_description,
    technologies,
}: ProjectCardProps) {
    const thumbRef = useRef<HTMLDivElement>(null);
    const [thumbH, setThumbH] = useState(0);

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
        <article className="flex flex-col gap-4 rounded border border-gray-200 bg-gray-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50 md:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
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
                <div className="min-w-0 flex justify-between flex-col">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {name}
                    </h2>
                    <ul className="flex flex-wrap gap-2 mt-2">
                        {technologies.map((technology) => (
                            <li key={technology}>
                                <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-neutral-700 dark:text-gray-200">
                                    {technology}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {short_description}
                    </p>
                    <div className="flex pt-1">
                        <Link
                            href={`/projects/${id}`}
                            className="inline-flex items-center justify-center border-2 rounded-md border-gray-900 bg-white px-6 py-2 text-sm font-medium text-gray-900 transition-colors dark:border-teal-400 dark:bg-teal-400 dark:text-gray-900"
                        >
                            See project
                        </Link>
                    </div>
                </div>

            </div>
        </article>
    );
}
