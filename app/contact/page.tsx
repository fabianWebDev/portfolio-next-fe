import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <>
            <h1 className="font-[family-name:var(--font-sekuya)] shrink-0 mt-8 text-4xl font-semibold text-gray-900 dark:text-teal-500/90 text-center">Contact</h1>
            <p className="text-gray-700 dark:text-gray-300 text-center">
                If you have any questions or want to work together, 
                <br />
                feel free to contact me or just shoot me an email at <a href="mailto:fabiancava22@gmail.com">fabiancava22@gmail.com</a>.
            </p>
            <ContactForm />
        </>
    );
}