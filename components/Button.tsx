import type { ButtonHTMLAttributes, ReactNode } from "react";

const variantClasses = {
    main:
        "cursor-pointer font-semibold text-base md:text-lg rounded-md py-2 px-4 dark:text-neutral-800 dark:hover:text-gray-100 dark:bg-teal-500 disabled:opacity-50 disabled:pointer-events-none hover:scale-105 transition-all duration-300",
    default:
        "cursor-pointer font-semibold text-base md:text-lg rounded-md py-2 px-4 dark:text-neutral-200 dark:bg-gradient-to-l dark:from-teal-400/90 dark:via-teal-400/70 dark:to-teal-500/90 dark:hover:bg-teal-700 dark:hover:text-gray-100 disabled:opacity-50 disabled:pointer-events-none hover:scale-105 transition-all duration-300",
    outline:
        "border-2 border-teal-500 cursor-pointer bg-transparent text-teal-500 font-semibold rounded-md py-1 px-4 text-base md:text-lg disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 hover:bg-teal-500 hover:text-neutral-950",
    text:
        "text-teal-400 text-sm cursor-pointer hover:underline transition-colors font-semibold rounded-md disabled:opacity-50 disabled:pointer-events-none",
    ghost:
        "bg-background cursor-pointer border-2 border-neutral-600 text-neutral-600 font-semibold rounded-lg py-1 px-4",
} as const;

type ButtonVariant = keyof typeof variantClasses;

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    variant?: ButtonVariant;
};

export default function Button({
    children,
    onClick,
    disabled,
    type = "button",
    variant = "default",
}: ButtonProps) {
    return (
        <button
            className={variantClasses[variant]}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
