export default function ContactForm() {
    return (
        <form className="flex flex-col mt-6 gap-4 w-full sm:w-3/4 md:w-1/4">
            <input className="border border-gray-300/50 rounded-md p-2" type="text" placeholder="Name" />
            <input className="border border-gray-300/50 rounded-md p-2" type="email" placeholder="Email" />
            <textarea className="border border-gray-300/50 rounded-md p-2" placeholder="Message" />
            <button className="border-2 border-teal-400 text-teal-400 font-semibold rounded-md p-2 w-1/2 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-background" type="submit">Submit</button>
        </form>
    );
}