"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/components/nav-links";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const isLinkActive = (href: string) => pathname === href;

    return (
        <>
            <header className="flex items-center justify-between gap-6 py-2 dark:bg-transparent mt-2">
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
                                className="h-12 w-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                            >
                                <path
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-12 w-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                            >
                                <path
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                    <Link
                        href="/"
                        className="text-lg font-bold text-purple-400/90 dark:text-teal-500/90 font-[family-name:var(--font-sekuya)] tracking-widest
                        dark:hover:text-teal-500 hover:scale-105 transition-all duration-300 text-shadow-2xs dark:text-shadow-purple-600"
                    >
                        WizOfCode
                    </Link>
                    <nav
                        className="hidden min-w-0 flex-1 items-center justify-end md:flex"
                        aria-label="Main"
                    >
                        <ul className="flex flex-wrap items-center justify-center gap-1">
                            {navLinks.map(({ href, label }) => {
                                const active = isLinkActive(href);

                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            aria-current={active ? "page" : undefined}
                                            className={`
                                                relative block rounded-sm px-3 py-2 text-lg outline-none transition-colors
                                                focus-visible:ring-2 focus-visible:ring-gray-200 dark:focus-visible:ring-gray-200 font-medium
                                                dark:hover:bg-purple-600/10
                                                ${active
                                                    ? "dark:text-purple-500 dark:bg-purple-600/10"
                                                    : "text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-neutral-800"
                                                }
                                            `}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                {/* <ThemeToggle /> */}
            </header>

            <div
                id="mobile-navigation"
                className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="">
                    <div className="border-b-2 border-teal-500/20 bg-white dark:border-purple-500 dark:bg-transparent">
                        <div className="flex flex-col divide-y dark:divide-purple-500">
                            {navLinks.map(({ href, label }) => {
                                const active = isLinkActive(href);

                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center justify-between px-4 py-3 text-base tracking-wide transition-colors ${active
                                                ? "dark:text-purple-500 dark:bg-purple-500/10"
                                                : "text-gray-800 hover:bg-gray-50 active:bg-gray-100 dark:text-gray-100 dark:hover:bg-neutral-900 dark:active:bg-neutral-800"
                                            }`}
                                    >
                                        <span className="font-medium">{label}</span>
                                        <span
                                            className={`h-5 w-[3px] rounded-full transition ${active
                                                    ? "bg-purple-500 dark:bg-purple-500"
                                                    : "bg-transparent"
                                                }`}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-b-1 dark:border-purple-600 shadow-sm dark:shadow-indigo-500" />
        </>
    );
}
