"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/components/nav-links";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const linkClass =
        "rounded-md px-3 py-2 text-lg font-bold text-gray-900 outline-none transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-100 dark:hover:bg-neutral-800 dark:focus-visible:ring-gray-500";

    const desktopLinkClass =
        "rounded-md px-3 py-2 text-lg text-gray-900 outline-none transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-100 dark:hover:bg-neutral-800 dark:focus-visible:ring-gray-500";

    return (
        <>
            <header className="flex items-center justify-between gap-6 border-b border-teal-400 bg-white py-2 dark:border-teal-400 dark:bg-background mb-6">
                <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-6">
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-gray-900 outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 md:hidden dark:text-gray-100 dark:hover:bg-neutral-800"
                        aria-expanded={open}
                        aria-controls="mobile-navigation"
                        aria-label={open ? "Cerrar menú" : "Abrir menú"}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                    <Link
                        href="/"
                        className="truncate text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100"
                    >
                        WizOfCode
                    </Link>
                    <nav
                        className="hidden min-w-0 flex-1 items-center justify-center md:flex"
                        aria-label="Main"
                    >
                        <ul className="flex flex-wrap items-center justify-center gap-1">
                            {navLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className={desktopLinkClass}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <ThemeToggle />
            </header>

            {open && (
                <div
                    className="fixed inset-x-0 bottom-0 top-14 z-40 md:hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-nav-title"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/50"
                        aria-label="Cerrar menú"
                        onClick={() => setOpen(false)}
                    />
                    <nav
                        id="mobile-navigation"
                        className="absolute inset-y-0 left-0 flex w-[min(18rem,85vw)] flex-col border-r border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-neutral-950"
                    >
                        <p id="mobile-nav-title" className="sr-only">
                            Navegación principal
                        </p>
                        <ul className="flex flex-col gap-1">
                            {navLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={linkClass}
                                        onClick={() => setOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}
