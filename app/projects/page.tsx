import ProjectCard from "@/components/projects/ProjectCard";
import { getApiBase } from "@/lib/api";
import { getSiteUrl, siteName } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected work and case studies from ${siteName} — full-stack and web development projects, tech stack, and live demos.`,
  openGraph: {
    title: `Projects | ${siteName}`,
    description: `Portfolio projects by ${siteName}.`,
    url: `${getSiteUrl()}/projects`,
  },
  alternates: { canonical: `${getSiteUrl()}/projects` },
};

const API_BASE = getApiBase();

async function fetchProjects() {
    const url = `${API_BASE.replace(/\/$/, "")}/projects/`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    const contentType = res.headers.get("content-type") ?? "";
    if (!res.ok || !contentType.includes("application/json")) {
        return null;
    }
    try {
        const data = await res.json();
        return Array.isArray(data) ? data : null;
    } catch {
        return null;
    }
}

export default async function ProjectsPage() {
    const data = await fetchProjects();

    return (
        <>
            <h1 className="font-[family-name:var(--font-sekuya)] shrink-0 mb-8 mt-8 text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-teal-500/90 text-center text-shadow-md dark:text-shadow-purple-600">
                Projects
            </h1>
            {data === null ? (
                <p className="text-gray-600 dark:text-gray-400">
                    Projects could not be loaded right now. The API may be
                    unavailable or returning an error.
                </p>
            ) : data.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                    No projects to show yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {data.map((project: any) => {
                        if (project.is_active) {
                            return (
                                <ProjectCard
                                    key={project.id}
                                    id={project.id}
                                    name={project.title}
                                    image={project.image}
                                    short_description={project.short_description}
                                    technologies={project.tech_list}
                                    project_type={project.project_type}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </>
    );
}