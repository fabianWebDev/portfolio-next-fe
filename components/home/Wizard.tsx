"use client";

import { TypeAnimation } from "react-type-animation";
import { useMemo, useState } from "react";

type WordEntry = {
    word: string;
    syllables: string;
    pronunciation: string;
    language: string;

    definitions: {
        meaning: string;
        example?: string;
        tag?: string;
    }[];

    synonyms: string[];
};

const words: WordEntry[] = [
    {
        word: "Wizard",
        syllables: "wiz·ard",
        pronunciation: "/ˈwi-zərd/",
        language: "English",
        definitions: [
            {
                meaning: "A person with magical powers",
            },
            {
                meaning: "A very skilled person",
                example: "a computer wizard",
            },
            {
                meaning: "A wise man",
                tag: "archaic",
            },
        ],
        synonyms: ["sorcerer", "mage", "warlock"],
    },
    {
        word: "Mago",
        syllables: "ma·go",
        pronunciation: "/ˈma-ɣo/",
        language: "Español",
        definitions: [
            {
                meaning: "Persona con poderes mágicos",
            },
            {
                meaning: "Persona muy hábil en algo",
                example: "Es un mago programando",
            },
            {
                meaning: "Ilusionista",
                tag: "coloquial",
            },
        ],
        synonyms: ["hechicero", "brujo"],
    },
    {
        word: "魔法使い",
        syllables: "まほうつかい",
        pronunciation: "/ma.hoː.ts͡ɯ.ka.i/",
        language: "日本語",
        definitions: [
            {
                meaning: "魔法を使う人（persona que usa magia）",
            },
            {
                meaning: "非常に熟練した人（persona muy hábil）",
            },
            {
                meaning: "賢者・知恵のある人（persona sabia）",
                tag: "古語",
            },
        ],
        synonyms: ["ウィザード", "魔術師"],
    },
    {
        word: "Sorcier",
        syllables: "sor·cier",
        pronunciation: "/sɔʁ.sje/",
        language: "Français",
        definitions: [
            {
                meaning: "Personne qui pratique la magie",
            },
            {
                meaning: "Personne très habile dans un domaine",
            },
            {
                meaning: "Homme sage",
                tag: "archaïque",
            },
        ],
        synonyms: ["magicien", "enchanteur", "mage"],
    },
];

export default function Wizard() {
    const [index, setIndex] = useState(0);

    const sequence = useMemo(
        () =>
            words.flatMap((w, i) => [
                () => {
                    setIndex(i);
                },
                w.word,
                2000,
            ]),
        []
    );

    const current = words[index];

    return (
        <section className="w-full mt-6 justify-center items-center inline-block mx-auto rounded-md border border-teal-400 bg-white p-4 text-sm text-gray-900 shadow-sm dark:border-teal-400 dark:bg-neutral-900 dark:text-gray-100">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <TypeAnimation
                    wrapper="h2"
                    className="inline text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
                    sequence={sequence}
                    speed={50}
                    repeat={Infinity}
                    preRenderFirstString
                />
                <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    noun
                </span>
                <span
                    className="text-xs font-medium text-teal-700 dark:text-teal-400"
                    aria-label={`Language: ${current.language}`}
                >
                    · {current.language}
                </span>
            </div>

            <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{current.syllables}</span>{" "}
                <span className="text-gray-500 dark:text-gray-400">
                    {current.pronunciation}
                </span>
            </div>

            <ol className="mt-3 space-y-2 pl-0 text-sm list-none">
                {current.definitions.map((def, i) => (
                    <li key={i} className="flex gap-2">
                        <span className="w-5 shrink-0 text-right text-gray-500 dark:text-gray-400">
                            {i + 1}
                        </span>
                        <div>
                            <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
                                {def.tag ? (
                                    <span className="mr-1 rounded-sm bg-gray-100 px-1 py-0.5 text-[0.65rem] uppercase tracking-wide text-gray-600 dark:bg-neutral-800 dark:text-gray-300">
                                        {def.tag}
                                    </span>
                                ) : null}
                                <span>{def.meaning}</span>
                            </div>
                            {def.example ? (
                                <div className="mt-0.5 pl-1 text-xs text-gray-600 italic dark:text-gray-400">
                                    {def.example}
                                </div>
                            ) : null}
                        </div>
                    </li>
                ))}
            </ol>

            <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Synonyms of{" "}
                <span className="normal-case font-normal text-gray-700 dark:text-gray-200">
                    {current.word}
                </span>
            </div>

            <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                {current.synonyms.map((syn) => (
                    <li key={syn}>
                        <span className="rounded-sm bg-blue-50 px-2 py-0.5 font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                            {syn}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
