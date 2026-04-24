import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";


export default function SocialWidget() {
    return (
        <div className="mt-2">
            <h3 className="text-2xl font-bold text-center text-gray-50">Connect with me</h3>
            <p className="text-gray-700 dark:text-gray-50 text-center mb-2">
                You can connect with me on the following platforms:
            </p>

            <div className="flex gap-2 justify-center">
                <Link target="_blank" href="https://www.linkedin.com/in/fabian-campos-cr/">
                    <FaLinkedin className="text-5xl text-purple-600 hover:scale-110 transition-all duration-300 border-2 border-purple-600 rounded-full p-2" />
                </Link>
                <Link target="_blank" href="https://github.com/fabianWebDev">
                    <FaGithub className="text-5xl text-purple-600 hover:scale-110 transition-all duration-300 border-2 border-purple-600 rounded-full p-2" />
                </Link>
                <Link target="_blank" href="https://wa.me/50688849310">
                    <FaWhatsapp className="text-5xl text-purple-600 hover:scale-110 transition-all duration-300 border-2 border-purple-600 rounded-full p-2" />
                </Link>
                {/* <Link target="_blank" href="https://twitter.com/fabiancampos">
                <FaTwitter className="text-5xl text-purple-600/40 hover:text-purple-600 border-2 border-purple-600/40 rounded-full p-2" />
            </Link>
            <Link target="_blank" href="https://instagram.com/fabiancampos">
                <FaInstagram className="text-5xl text-purple-600/40 hover:text-purple-600 border-2 border-purple-600/40 rounded-full p-2" />
            </Link>
            <Link target="_blank" href="https://facebook.com/fabiancampos">
                <FaFacebook className="text-5xl text-purple-600/40 hover:text-purple-600 border-2 border-purple-600/40 rounded-full p-2" />
            </Link> */}
            </div>
        </div>
    );
}