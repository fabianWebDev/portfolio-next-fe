import ProjectCard from "@/components/projects/ProjectCard";

export default async function ProjectsPage() {
    const res = await fetch("https://portfolio-be-twdt.onrender.com/api/projects/");
    const data = await res.json();

    return (
        <main className="flex min-h-screen flex-col gap-10">
            <h1>Projects</h1>
            {data.map((project: any) => {
                return (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        short_description={project.short_description}
                        technologies={project.tech_list}
                    />
                )
            })}
        </main>
    );
}

