import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return (
      <div className="flex flex-col flex-1 mx-auto w-full max-w-[1200px] px-4 ">
        {children}
      </div>
    );
  }