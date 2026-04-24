"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Description() {
    const router = useRouter();
    return (
        <section className="mt-10">
            <hr className="dark:border-purple-900/20 mb-10" />
            <h2 className="font-[family-name:var(--font-sekuya)] text-2xl sm:text-3xl font-semibold tracking-wider text-gray-900 dark:text-teal-500/90 text-shadow-2xs dark:text-shadow-purple-600 text-center">About Me</h2>
            <div className="text-gray-700 dark:text-neutral-50 mt-2 sm:mt-4 text-center">
                <p className="text-base md:text-xl tracking-wide">
                    Hi! I'm Fabian,
                    <br />
                    I help businesses and creators build digital products from idea to launch — clean, scalable, and user-focused.
                </p>
            </div>
            <div className="mt-4 flex gap-2 justify-center">
                <Button onClick={() => router.push("/projects")} variant="main">See my work</Button>
                <Button onClick={() => router.push("/contact")} variant="outline">Contact me</Button>
            </div>
            <hr className="dark:border-purple-900/20 mt-10" />
        </section>
    );
}
