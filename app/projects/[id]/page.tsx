type ProjectPageProps = {
    params: Promise<{ id: string; }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const res = await fetch(`https://portfolio-be-twdt.onrender.com/api/projects/${id}`);
    const data = await res.json();

    return (
        <main className="flex min-h-0 flex-1 flex-col items-center justify-between overflow-y-auto p-24">
            <h1>{data.name}</h1>
            <p>{data.short_description}</p>
            <a href={data.link} target="_blank" rel="noopener noreferrer">View Project</a>
            <ul>
                {data.tech_list.map((technology: string) => {
                    return (
                        <li key={technology}>{technology}</li>
                    )
                })}
            </ul>
        </main>
    );
}