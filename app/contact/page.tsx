import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <>
            <h1 className="font-[family-name:var(--font-sekuya)] shrink-0 mt-8 mb-8 text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-teal-500/90 text-center text-shadow-md dark:text-shadow-purple-600 text-shadow-md dark:text-shadow-purple-600">Contact</h1>
            <ContactForm />
        </>
    );
}