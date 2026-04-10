"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Description() {
    const router = useRouter();
    return (
        <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">About Me</h2>
            <div className="text-gray-700 dark:text-gray-300">
                <p className="text-md">
                    Hi, I'm Fabián Campos!
                    <br />
                    I'm a full-stack software engineer with 6+ years of experience building web applications with Python, Django, React, and modern frontend tools.
                </p>
                <p className="text-md">
                    I turn ideas into clean, scalable, and user-focused digital products.
                </p>
            </div>
            <div className="mt-2">
                <Button onClick={() => router.push("/projects")}>View Projects</Button>
            </div>
        </section>
    );
}
