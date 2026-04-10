import ProjectCard from "@/components/projects/ProjectCard";

export default async function ProjectsPage() {
    const res = await fetch("https://portfolio-be-twdt.onrender.com/api/projects/");
    const data = await res.json();

    return (
        <>
            <h1 className="shrink-0 mb-6 text-4xl font-semibold text-gray-900 dark:text-gray-100">
                Projects
            </h1>
            <main className="flex min-h-0 flex-1 flex-col gap-4 w-full">

                <div className="min-h-0 flex-1 overflow-y-auto w-full">
                    <div className="grid grid-cols-1 gap-4 pb-2 md:pr-2 lg:pr-4 md:grid-cols-2">
                        {data.map((project: any) => {
                            return (
                                <ProjectCard
                                    key={project.id}
                                    id={project.id}
                                    name={project.name}
                                    image={project.image}
                                    short_description={project.short_description}
                                    technologies={project.tech_list}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    );
}

