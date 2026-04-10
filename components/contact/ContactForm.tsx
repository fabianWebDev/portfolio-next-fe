"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/Button";

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://portfolio-be-twdt.onrender.com/api";

const CONTACT_URL = `${API_BASE.replace(/\/$/, "")}/contact`;

type SubmitState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success" }
    | { status: "error"; message: string };

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitState, setSubmitState] = useState<SubmitState>({
        status: "idle",
    });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitState({ status: "loading" });

        try {
            const res = await fetch(CONTACT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!res.ok) {
                let messageText = `Error ${res.status}`;
                try {
                    const errBody = (await res.json()) as Record<
                        string,
                        unknown
                    >;
                    if (typeof errBody.detail === "string") {
                        messageText = errBody.detail;
                    } else if (errBody && typeof errBody === "object") {
                        const parts = Object.entries(errBody).flatMap(
                            ([key, val]) => {
                                if (Array.isArray(val))
                                    return `${key}: ${val.join(", ")}`;
                                if (typeof val === "string") return `${key}: ${val}`;
                                return [];
                            },
                        );
                        if (parts.length) messageText = parts.join(" ");
                    }
                } catch {
                    /* use status message */
                }
                setSubmitState({ status: "error", message: messageText });
                return;
            }

            setSubmitState({ status: "success" });
            setName("");
            setEmail("");
            setMessage("");
        } catch {
            setSubmitState({
                status: "error",
                message: "Could not reach the server. Try again later.",
            });
        }
    }

    return (
        <form
            className="p-1"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col mt-6 gap-4 w-full sm:w-3/4 md:w-1/4">
                <input
                    className="border border-gray-200 dark:border-gray-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-teal-400 dark:focus:ring-teal-400"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    disabled={submitState.status === "loading"}
                />
                <input
                    className="border border-gray-200 dark:border-gray-800 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-teal-400 dark:focus:ring-teal-400"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    disabled={submitState.status === "loading"}
                />
                <textarea
                    className="border border-gray-200 dark:border-gray-800 rounded-md py-2 px-4 min-h-[120px] focus:outline-none focus:ring-1 focus:ring-teal-400 dark:focus:ring-teal-400"
                    name="message"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={submitState.status === "loading"}
                />
            </div>
            <div className="mt-4">
            <Button type="submit" disabled={submitState.status === "loading"} variant="default">
                {submitState.status === "loading" ? "Sending…" : "Submit"}
            </Button>
            </div>
            {submitState.status === "success" ? (
                <p className="text-sm text-teal-600 dark:text-teal-400">
                    Message sent. Thank you!
                </p>
            ) : null}
            {submitState.status === "error" ? (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                    {submitState.message}
                </p>
            ) : null}
        </form>
    );
}
