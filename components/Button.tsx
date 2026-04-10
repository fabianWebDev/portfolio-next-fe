import type { ButtonHTMLAttributes, ReactNode } from "react";

const variantClasses = {
    default:
        "border-2 cursor-pointer border-teal-400 text-teal-white font-semibold rounded-md py-2 px-4 dark:text-gray-800 dark:bg-teal-400 dark:hover:bg-teal-400 dark:hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none",
    outline:
        "border-2 cursor-pointer border-teal-400 bg-background text-teal-400 font-semibold rounded-md py-1 px-4 disabled:opacity-50 disabled:pointer-events-none",
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
