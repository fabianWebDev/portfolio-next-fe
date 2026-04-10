"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter, useParams } from "next/navigation";

type ProjectDetail = {
    name: string;
    image: string;
    short_description: string;
    description?: string;
    tech_list: string[];
    link: string;
    github_url: string | null;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;

function ZoomableLightbox({
    open,
    onClose,
    src,
    alt,
}: {
    open: boolean;
    onClose: () => void;
    src: string;
    alt: string;
}) {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragging = useRef(false);
    const lastPointer = useRef({ x: 0, y: 0 });
    const viewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            setZoom(1);
            setPan({ x: 0, y: 0 });
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "+" || e.key === "=") {
                e.preventDefault();
                setZoom((z) => Math.min(MAX_ZOOM, z * 1.2));
            } else if (e.key === "-" || e.key === "_") {
                e.preventDefault();
                setZoom((z) => {
                    const nz = Math.max(MIN_ZOOM, z / 1.2);
                    if (nz === 1) setPan({ x: 0, y: 0 });
                    return nz;
                });
            } else if (e.key === "0") {
                setZoom(1);
                setPan({ x: 0, y: 0 });
            }
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    useEffect(() => {
        const el = viewportRef.current;
        if (!el || !open) return;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
            setZoom((z) => {
                const nz = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * factor));
                if (nz === 1) setPan({ x: 0, y: 0 });
                return nz;
            });
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [open]);

    const zoomIn = () =>
        setZoom((z) => Math.min(MAX_ZOOM, z * 1.25));
    const zoomOut = () =>
        setZoom((z) => {
            const nz = Math.max(MIN_ZOOM, z / 1.25);
            if (nz === 1) setPan({ x: 0, y: 0 });
            return nz;
        });
    const resetView = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    const onPointerDown = (e: React.PointerEvent) => {
        if (zoom <= 1) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        dragging.current = true;
        setIsDragging(true);
        lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastPointer.current.x;
        const dy = e.clientY - lastPointer.current.y;
        lastPointer.current = { x: e.clientX, y: e.clientY };
        setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    };

    const endDrag = (e: React.PointerEvent) => {
        if (!dragging.current) return;
        dragging.current = false;
        setIsDragging(false);
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
            /* already released */
        }
    };

    if (!open) return null;

    const zoomPercent = Math.round(zoom * 100);

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col bg-black/90"
            role="dialog"
            aria-modal="true"
            aria-label={`Full image: ${alt}`}
            onClick={onClose}
        >
            <div
                className="flex shrink-0 flex-wrap items-center justify-between gap-2 px-3 py-3"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
                    onClick={onClose}
                >
                    Close
                </button>
                <div
                    className="flex flex-wrap items-center justify-end gap-2"
                    role="group"
                    aria-label="Zoom controls"
                >
                    <button
                        type="button"
                        className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25 disabled:opacity-40"
                        onClick={zoomOut}
                        disabled={zoom <= MIN_ZOOM}
                        aria-label="Zoom out"
                    >
                        −
                    </button>
                    <span className="min-w-[3.25rem] text-center text-sm tabular-nums text-white">
                        {zoomPercent}%
                    </span>
                    <button
                        type="button"
                        className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25 disabled:opacity-40"
                        onClick={zoomIn}
                        disabled={zoom >= MAX_ZOOM}
                        aria-label="Zoom in"
                    >
                        +
                    </button>
                    <button
                        type="button"
                        className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
                        onClick={resetView}
                        aria-label="Reset zoom and position"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div
                ref={viewportRef}
                className="relative min-h-0 flex-1 touch-none overflow-hidden"
                onClick={onClose}
            >
                <div className="flex h-full w-full items-center justify-center p-4">
                    <div
                        className={`select-none ${zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
                        style={{
                            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                            transition: isDragging
                                ? "none"
                                : "transform 0.12s ease-out",
                            transformOrigin: "center center",
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element -- lightbox uses native img for zoom/pan */}
                        <img
                            src={src}
                            alt={alt}
                            className="max-h-[min(85vh,85dvh)] max-w-[min(100vw-2rem,100%)] object-contain pointer-events-none"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>

            <p className="pointer-events-none shrink-0 px-3 pb-3 text-center text-xs text-white/70">
                Scroll to zoom · Drag when zoomed · + / − / 0 keys
            </p>
        </div>
    );
}

export default function ProjectPage() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<ProjectDetail | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;
        fetch(`https://portfolio-be-twdt.onrender.com/api/projects/${id}`)
            .then((res) => res.json())
            .then(setData);
    }, [id]);

    if (!data) {
        return (
            <main className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 py-16">
                <p className="text-gray-600 dark:text-gray-400">Loading project…</p>
            </main>
        );
    }

    const bodyText = data.description?.trim() || data.short_description;

    return (
        <main className="flex min-h-0 w-full flex-1 flex-col gap-8">
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
                <div className="flex min-w-0 flex-col gap-6">
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl">
                        {data.name}
                    </h1>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700 dark:border-gray-800 dark:bg-neutral-900 dark:text-gray-300 md:p-5">
                        <p className="whitespace-pre-wrap leading-relaxed">
                            {bodyText}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                            Technologies Used:
                        </h2>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {data.tech_list.map((technology) => (
                                <li key={technology}>
                                    <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-800 dark:bg-neutral-700 dark:text-gray-200">
                                        {technology}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                            Links:
                        </h2>
                        {data.github_url ? (
                            <a
                                href={data.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-11 max-w-[5.5rem] items-center justify-center rounded-full border border-gray-300 bg-gray-100 px-5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100 dark:hover:bg-neutral-700"
                            >
                                GitHub
                            </a>
                        ) : null}
                        <div className="shrink-0">
                            <Button
                                onClick={() => router.push(data.link)}
                                variant="outline"
                            >
                                View website
                            </Button>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="group relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-lg border border-gray-200 text-left outline-none ring-offset-2 transition hover:opacity-[0.98] focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-800 dark:bg-neutral-800 dark:focus-visible:ring-neutral-500 lg:sticky lg:top-4 lg:aspect-auto lg:min-h-[min(70vh,560px)]"
                    aria-label={`See full image: ${data.name}`}
                >
                    <Image
                        src={data.image}
                        alt=""
                        fill
                        className="object-cover dark:border-neutral-700"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-3 py-3 text-center text-sm font-medium text-white md:py-4">
                        See full image
                    </span>
                </button>
            </div>

            <ZoomableLightbox
                open={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                src={data.image}
                alt={data.name}
            />
        </main>
    );
}
