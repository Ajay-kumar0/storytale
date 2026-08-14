export default function StatBar({
    icon: Icon,
    label,
    value,
    max,
    accent = "ember",
}) {
    const percentage = Math.max(0, Math.min(100, (value / max) * 100));

    const fillClass =
        accent === "danger"
            ? "from-danger-600 to-danger-400"
            : "from-ember-600 to-ember-400";

    const iconClass =
        accent === "danger" ? "text-danger-400" : "text-ember-400";

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-ash-300">
                    <Icon size={16} className={iconClass} />
                    <span>{label}</span>
                </div>

                <span className="text-sm font-mono text-ash-100">
                    {value} / {max}
                </span>
            </div>

            <div className="w-full bg-ink-950 rounded-full h-2.5 overflow-hidden border border-ink-700">
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${fillClass} transition-all duration-500`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
}
