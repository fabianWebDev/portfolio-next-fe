import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">Contact</h1>
            <p className="text-gray-700 dark:text-gray-300">
                If you have any questions or want to work together, 
                <br />
                feel free to contact me or just shoot me an email at <a href="mailto:fabiancava22@gmail.com">fabiancava22@gmail.com</a>.
            </p>
            <ContactForm />
        </main>
    );
}