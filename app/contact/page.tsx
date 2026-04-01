import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Contact</h1>
            <ContactForm />
        </main>
    );
}