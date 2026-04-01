export default function MainSection({ children }: { children: React.ReactNode }) {
    return (
        <div className="col-span-12 flex h-full min-h-0 flex-col overflow-hidden p-4 md:col-span-8">
            {children}
        </div>
    );
}
