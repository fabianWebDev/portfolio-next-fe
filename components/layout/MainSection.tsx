import type { ReactNode } from "react";

export default function MainSection({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-full min-h-0 w-full max-w-[1200px] flex-col justify-self-center overflow-hidden p-4 mx-auto">
            {children}
        </div>
    );
}
