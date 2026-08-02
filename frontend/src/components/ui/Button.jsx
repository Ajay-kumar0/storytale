export default function Button({
    children,
    onClick,
    className = "",
    type = "button",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                bg-blue-600
                hover:bg-blue-700
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