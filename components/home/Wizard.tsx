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
                example: "The wizard cast a spell over the enchanted forest",
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
                example: "El mago transformó la rana en príncipe",
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
                meaning: "魔法を使う人",
                example: "その魔法使いは嵐を呼び起こした",
            },
            {
                meaning: "非常に熟練した人",
                example: "彼はコードの魔法使いだ",
            },
            {
                meaning: "賢者・知恵のある人",
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
                example: "Le sorcier invoqua les esprits de la forêt",
            },
            {
                meaning: "Personne très habile dans un domaine",
                example: "C'est un vrai sorcier en cuisine",
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
        <section className="w-full items-center rounded mx-auto border-3 p-6 lg:w-2/3 shadow-xl/20 dark:inset-shadow-sm dark:inset-shadow-indigo-500/80 justify-center dark:border-purple-500 dark:bg-purple-600/10 dark:text-gray-100 tracking-wider dark:shadow-indigo-500/80">
            <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
                <TypeAnimation
                    wrapper="h2"
                    className="inline text-4xl font-semibold tracking-normal dark:text-neutral-200 text-shadow-md dark:text-shadow-neutral-950"
                    sequence={sequence}
                    speed={50}
                    repeat={Infinity}
                    preRenderFirstString
                />
                <span className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 text-shadow-md dark:text-shadow-neutral-950/40">
                    noun
                </span>
                <span
                    className="text-base font-semibold dark:text-teal-400 text-shadow-md dark:text-shadow-neutral-950/40"
                    aria-label={`Language: ${current.language}`}
                >
                    · {current.language}
                </span>
            </div>

            <div className="mt-1 text-base dark:text-gray-400 text-shadow-md dark:text-shadow-neutral-950/40">
                <span className="font-semibold">{current.syllables}</span>{" "}
                <span className="dark:text-gray-400 text-shadow-md dark:text-shadow-neutral-950/40">
                    {current.pronunciation}
                </span>
            </div>

            <ol className="mt-3 space-y-2 pl-0 text-base list-none">
                {current.definitions.map((def, i) => (
                    <li key={i} className="flex gap-2">
                        <span className="w-5 shrink-0 text-right dark:text-gray-400 text-shadow-md dark:text-shadow-neutral-950/40">
                            {i + 1}:
                        </span>
                        <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            {def.tag ? (
                                <span className="shrink-0 rounded-sm px-2 py-1 text-[0.65rem] uppercase tracking-wide dark:bg-teal-500/20 dark:text-teal-400 shadow-sm/20 dark:shadow-neutral-950">
                                    {def.tag}
                                </span>
                            ) : null}
                            <span className="min-w-0">{def.meaning}.</span>
                            {def.example ? (
                                <>
                                    <span className="min-w-0 italic dark:text-gray-400 text-shadow-md     dark:text-shadow-neutral-950/40">
                                        {def.example}.
                                    </span>
                                </>
                            ) : null}
                        </div>
                    </li>
                ))}
            </ol>

            <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 text-shadow-md dark:text-shadow-neutral-950/40">
                Synonyms of{" "}
                <span className="normal-case font-semibold text-lg dark:text-gray-200">
                    {current.word}
                </span>
            </div>

            <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                {current.synonyms.map((syn) => (
                    <li key={syn}>
                        <span className="rounded-sm px-2 py-1 font-semibold dark:bg-teal-500/20 dark:text-teal-400 shadow-sm/20 dark:shadow-neutral-950">
                            {syn}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
