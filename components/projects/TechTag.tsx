"use client";

import { type ComponentType, type SVGProps } from "react";
import {
    DjangoPlain,
    JavascriptOriginal,
    NextjsPlain,
    PythonPlain,
    ReactOriginal,
    TailwindcssOriginal,
} from "devicons-react";

type DevIconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

const TECH_ICONS = {
    "next.js": { icon: NextjsPlain, color: "#ffffff" },
    tailwind: { icon: TailwindcssOriginal, color: "#38bdf8" },
    django: { icon: DjangoPlain, color: "#092e20" },
    react: { icon: ReactOriginal, color: "#61dafb" },
    python: { icon: PythonPlain, color: "#3776ab" },
    javascript: { icon: JavascriptOriginal, color: "#f1e05a" },
} as const satisfies Record<string, { icon: DevIconComponent; color: string }>;

type TechTagProps = {
    name: string;
};

export default function TechTag({ name }: TechTagProps) {
    const normalizedName = name.trim().toLowerCase();
    const tech = TECH_ICONS[normalizedName as keyof typeof TECH_ICONS];
    const Icon = tech?.icon;

    return (
        <li className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold tracking-wide dark:bg-violet-800/40 dark:text-neutral-200">
            {Icon ? <Icon size={18} color={tech.color} aria-hidden="true" /> : null}
            <span>{name}</span>
        </li>
    );
}
