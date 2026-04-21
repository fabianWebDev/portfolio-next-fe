"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import ZoomableLightbox from "@/components/projects/ZoomableLightbox";
import { useRouter, useParams } from "next/navigation";

type ProjectDetail = {
    title: string;
    image: string;
    short_description: string;
    full_description?: string;
    tech_list: string[];
    project_url: string;
    github_url: string | null;
    project_type: string;
    
};

/** First block separated by a blank line; otherwise the whole trimmed string. */
function getFirstParagraph(text: string): string {
    const t = text.trim();
    if (!t) return "";
    const parts = t.split(/\n\s*\n/);
    return (parts[0] ?? "").trim();
}

export default function ProjectPage() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<ProjectDetail | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;
        fetch(`http://127.0.0.1:8000/api/projects/${id}`)
            .then((res) => res.json())
            .then(setData);
    }, [id]);

    if (!data) {
        return (
            <>
                <p className="text-gray-600 dark:text-gray-400">Loading project…</p>
            </>
        );
    }

    const fullDescription = data.full_description?.trim() ?? "";
    const shortDescription = data.short_description?.trim() ?? "";
    const firstParagraphOfFull = getFirstParagraph(fullDescription);
    const hasExpandableDescription =
        fullDescription.length > 0 &&
        fullDescription !== firstParagraphOfFull;

    const browserBarHost = (() => {
        try {
            return new URL(data.project_url).hostname.replace(/^www\./, "");
        } catch {
            return data.project_url;
        }
    })();

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start">
                <div className="flex min-w-0 flex-col">
                    {data.project_type && (
                        <div className="flex items-center mb-1">
                            <span className="rounded-full bg-blue-500/50 text-blue-300 text-xs px-2 py-1">
                                <span className="w-2 h-2 rounded-full bg-blue-300 inline-block mr-2">
                                </span>
                                {data.project_type}
                            </span>
                        </div>
                    )}
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl mt-1 mb-1">
                        {data.title}
                    </h1>

                    <div className="rounded-lg bg-background text-gray-700 dark:border-gray-800 dark:bg-background dark:text-gray-100">
                        {hasExpandableDescription ? (
                            <div className="flex flex-col ">
                                <div
                                    id="project-description"
                                    className="text-md leading-relaxed text-gray-700 dark:text-gray-300"
                                >
                                    <p className="whitespace-pre-wrap">
                                        {descriptionExpanded
                                            ? fullDescription
                                            : firstParagraphOfFull}
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <Button
                                        onClick={() =>
                                            setDescriptionExpanded((open) => !open)
                                        }
                                        variant="text"
                                        aria-expanded={descriptionExpanded}
                                        aria-controls="project-description"
                                    >
                                        {descriptionExpanded ? "Read less" : "Read more"}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <p className="whitespace-pre-wrap leading-relaxed">
                                {fullDescription || shortDescription}
                            </p>
                        )}
                    </div>

                    <div>
                        <ul className="mt-2 flex flex-wrap gap-2">
                            {data.tech_list.map((technology) => (
                                <li key={technology}>
                                    <span className="inline-block rounded-full bg-neutral-200 px-3 py-1 text-xs text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">
                                        {technology}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        <div className="flex flex-wrap gap-2 shrink-0">
                            {data.github_url ? (
                                <Button
                                    onClick={() => router.push(data.github_url || "")}
                                    variant="outline"
                                >
                                    GitHub
                                </Button>
                            ) : null}

                            <Button
                                onClick={() => router.push(data.project_url)}
                                variant="ghost"
                            >
                                View website
                            </Button>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="rounded-2xl overflow-hidden"
                    aria-label={`See full image: ${data.title}`}
                >
                    <div
                        className="flex shrink-0 items-center gap-2 px-3 py-2.5 bg-neutral-800/90"
                        aria-hidden
                    >
                        <div className="flex gap-1.5" role="presentation">
                            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="size-2.5 rounded-full bg-[#febc2e]" />
                            <span className="size-2.5 rounded-full bg-[#28c840]" />
                        </div>

                        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-gray-200/90 bg-white px-2.5 py-1 text-[11px] text-gray-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-neutral-600 dark:bg-neutral-900/80 dark:text-neutral-400">
                            <svg
                                className="size-3 shrink-0 text-gray-400 dark:text-neutral-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden
                            >
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <span className="truncate tabular-nums">
                                https://{browserBarHost}
                            </span>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:min-h-[min(calc(70vh-3rem),520px)]">
                        <Image
                            src={data.image}
                            alt=""
                            fill
                            className="object-cover object-top"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            priority
                        />

                        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-3 py-3 text-center text-sm font-medium text-white md:py-4">
                            See full image
                        </span>
                    </div>
                </button>
            </div>

            <ZoomableLightbox
                open={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                src={data.image}
                alt={data.title}
            />
        </>
    );
}
