import Link from "next/link";

export default function Description() {
    return (
        <section className="mt-6">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">WizOfCode</h1>
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
            <Link className="bg-teal-400 text-gray-200 dark:text-gray-900 rounded-md p-2 mt-2 inline-block" href="/projects">View Projects</Link>
        </section>
    );
}
