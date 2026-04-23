"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Description() {
    const router = useRouter();
    return (
        <section className="mt-10">
            <hr className="dark:border-purple-900/20 mb-10" />
            <h2 className="font-[family-name:var(--font-sekuya)] text-3xl font-semibold tracking-wider text-gray-900 dark:text-teal-500/90 text-shadow-2xs dark:text-shadow-purple-600">About Me</h2>
            <div className="text-gray-700 dark:text-gray-300 mt-2">
                <p className="text-base md:text-xl tracking-wide">
                    Hi, I'm Fabián Campos!
                    <br />
                    I'm a full-stack software engineer with 6+ years of experience building web applications with Python, Django, React, and modern frontend tools.
                </p>
                <p className="text-base md:text-xl tracking-wide">
                    I turn ideas into clean, scalable, and user-focused digital products.
                </p>
            </div>
            <div className="mt-4 flex gap-2">
                <Button onClick={() => router.push("/projects")} variant="main">See my work</Button>
                <Button onClick={() => router.push("/contact")} variant="outline">Contact me</Button>
            </div>
            <hr className="dark:border-purple-900/20 mt-10" />
        </section>
    );
}
