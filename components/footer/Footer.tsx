export default function Footer() {
    return (
        <footer className="mt-8">
            <hr className="dark:border-purple-900/20 mt-4 mb-4" />
            <p className="text-xs dark:text-neutral-200/90 text-center mb-4">
                &copy; {new Date().getFullYear()} WizOfCode - All rights reserved
            </p>
        </footer>
    );
}