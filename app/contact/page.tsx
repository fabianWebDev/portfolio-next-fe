import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Contact</h1>
            <ContactForm />
        </main>
    );
}