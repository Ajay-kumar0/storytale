export default function Button({
    children,
    onClick,
    className = "",
    type = "button",
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                bg-ember-500
                hover:bg-ember-400
                hover:shadow-[0_0_20px_rgba(232,98,44,0.45)]
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:bg-ember-500
                disabled:hover:shadow-none
                text-ink-950
                px-5
                py-3
                rounded-lg
                transition
                font-semibold
                ${className}
            `}
        >
            {children}
        </button>
    );
}
