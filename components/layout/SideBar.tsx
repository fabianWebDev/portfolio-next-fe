import Link from "next/link";
import { navLinks } from "@/components/nav-links";

const linkClass =
    "px-3 py-2 text-lg  text-gray-900 outline-none transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-100 dark:hover:bg-neutral-800 dark:focus-visible:ring-gray-500";

export default function SideBar() {
    return (
        <aside className="col-span-2 hidden h-full min-h-0 flex-col items-end bg-white p-4 dark:bg-neutral-950 md:flex">
            <nav aria-label="Main">
                <ul className="flex flex-col gap-1">
                    {navLinks.map(({ href, label }) => (
                        <li key={href}>
                            <Link href={href} className={linkClass}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
