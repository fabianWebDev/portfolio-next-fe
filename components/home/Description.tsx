"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Description() {
    const router = useRouter();
    return (
        <section className="mt-6">
            <h2 className="font-[family-name:var(--font-sekuya)] text-3xl font-semibold text-gray-900 dark:text-teal-500/90 tracking-wider">About Me</h2>
            <div className="text-gray-700 dark:text-gray-300 mt-2">
                <p className="text-xl">
                    Hi, I'm Fabián Campos!
                    <br />
                    I'm a full-stack software engineer with 6+ years of experience building web applications with Python, Django, React, and modern frontend tools.
                </p>
                <p className="text-xl">
                    I turn ideas into clean, scalable, and user-focused digital products.
                </p>
            </div>
            <div className="mt-4">
                <Button onClick={() => router.push("/projects")} variant="main">View Projects</Button>
            </div>
        </section>
    );
}
