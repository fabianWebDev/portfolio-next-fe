import type { ButtonHTMLAttributes, ReactNode } from "react";
    
const variantClasses = {
    main:
        "cursor-pointer text-teal-white font-semibold text-base md:text-xl rounded-md py-2 px-4 dark:text-gray-200/90 dark:bg-gradient-to-l dark:from-teal-400/90 dark:via-teal-400/80 dark:to-teal-400/70 dark:hover:bg-teal-700 dark:hover:text-gray-100 disabled:opacity-50 disabled:pointer-events-none hover:scale-105 transition-all duration-300",
    default:
        "cursor-pointer text-teal-white font-semibold rounded-md py-2 px-4 dark:text-gray-200/90 dark:bg-gradient-to-r dark:from-orange-500/80 dark:via-amber-500/80 dark:to-yellow-500/80 dark:hover:bg-orange-700 dark:hover:text-gray-100 disabled:opacity-50 disabled:pointer-events-none",
    outline:
        "border-2 cursor-pointer border-teal-400 bg-transparent text-teal-400 font-semibold rounded-md py-1 px-4 disabled:opacity-50 disabled:pointer-events-none",
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
