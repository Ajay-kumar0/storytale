export default function StatBar({
    icon: Icon,
    label,
    value,
    max,
    color,
}) {
    const percentage = (value / max) * 100;

    return (
        <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <Icon size={18} className={color} />
                    <span>{label}</span>
                </div>

                <span>
                    {value} / {max}
                </span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                    className={`${color.replace("text", "bg")} h-2 rounded-full`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
}