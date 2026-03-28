"use client";

import { TypeAnimation } from "react-type-animation";

export default function Wizard() {
    return (
        <section className="w-full justify-center items-center inline-block mx-auto rounded-md border border-gray-300 bg-white p-4 text-sm text-gray-900 shadow-sm dark:border-gray-700 dark:bg-neutral-900 dark:text-gray-100">
            <div className="flex items-baseline gap-2">
                <TypeAnimation
                    wrapper="h2"
                    className="inline text-2xl font-semibold tracking-tight"
                    sequence={["Wizard", 2000, "Mago", 2000, "まほうつかい", 2000, "Sorcier", 2000]}
                    speed={50}
                    repeat={Infinity}
                    preRenderFirstString
                />
                <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    noun
                </span>
            </div>
            <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">wiz·ard</span>{" "}
                <span className="text-gray-500 dark:text-gray-400">/ˈwi-zərd/</span>
            </div>
            <span>A man who is believed to have magical powers and who uses them to harm or help other people</span>
            <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Synonyms of <span className="lowercase font-normal text-gray-700 dark:text-gray-200">wizard</span>
            </div>
            <ol className="mt-2 space-y-1 pl-4 text-sm">

                <li className="flex gap-2">
                    <span className="w-5 text-right text-gray-500 dark:text-gray-400">1</span>
                    <div>
                        <span>: one skilled in magic :</span>{" "}
                        <span className="font-semibold text-blue-700 dark:text-blue-400">
                            SORCERER
                        </span>
                    </div>
                </li>
                <li className="flex gap-2">
                    <span className="w-5 text-right text-gray-500 dark:text-gray-400">2</span>
                    <div>
                        <span>: a very clever or skillful person</span>
                        <div className="mt-0.5 pl-4 text-xs text-gray-600 italic dark:text-gray-400">
                            computer wizards
                        </div>
                    </div>
                </li>
                <li className="flex gap-2">
                    <span className="w-5 text-right text-gray-500 dark:text-gray-400">3</span>
                    <div>
                        <span className="mr-1 rounded-sm bg-gray-100 px-1 py-0.5 text-[0.65rem] uppercase tracking-wide text-gray-600 dark:bg-neutral-800 dark:text-gray-300">
                            archaic
                        </span>
                        <span>: a wise man :</span>{" "}
                        <span className="font-semibold text-blue-700 dark:text-blue-400">
                            SAGE
                        </span>
                    </div>
                </li>
            </ol>
        </section>
    );
}