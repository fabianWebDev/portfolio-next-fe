export default function ContactForm() {
    return (
        <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message" />
            <button type="submit">Submit</button>
        </form>
    );
}