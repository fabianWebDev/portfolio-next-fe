export default function MainSection({ children }: { children: React.ReactNode }) {
    return (
        <div className="col-span-12 flex min-h-[calc(100vh-3.5rem)] flex-col gap-10 p-4 md:col-span-8">
            {children}
        </div>
    );
}
