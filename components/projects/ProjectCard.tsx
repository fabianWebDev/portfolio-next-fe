import Link from "next/link";

export default function ProjectCard({ id, name, short_description, technologies }: { id: number, name: string, short_description: string, technologies: string[] }) {
    return (
        <div className="">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{short_description}</p>
            <ul>
                {technologies.map((technology: string) => {
                    return (
                        <li key={technology}>{technology}</li>
                    )
                })}
            </ul>
            <Link href={`/projects/${id}`}>View Project</Link>
        </div>
    );
}