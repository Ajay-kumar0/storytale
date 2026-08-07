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
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:bg-blue-600
                text-white
                px-5
                py-3
                rounded-lg
                transition
                font-medium
                ${className}
            `}
        >
            {children}
        </button>
    );
}