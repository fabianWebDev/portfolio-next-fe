"use client";

import {
    useEffect,
    useRef,
    useState,
    type PointerEvent as ReactPointerEvent,
} from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;

type ZoomableLightboxProps = {
    open: boolean;
    onClose: () => void;
    src: string;
    alt: string;
};

export default function ZoomableLightbox({
    open,
    onClose,
    src,
    alt,
}: ZoomableLightboxProps) {
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

    const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (zoom <= 1) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        dragging.current = true;
        setIsDragging(true);
        lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastPointer.current.x;
        const dy = e.clientY - lastPointer.current.y;
        lastPointer.current = { x: e.clientX, y: e.clientY };
        setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    };

    const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
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
