import { Heart, User } from "lucide-react";
import StatBar from "./StatBar";

export default function PlayerCard({ player }) {

    const lowHealth = player.max_health > 0
        && player.health / player.max_health <= 0.25;

    return (
        <div className="bg-ink-900 border border-ink-700 rounded-2xl p-6 relative overflow-hidden">

            <div
                className="ambient-glow w-40 h-40 bg-ember-500/10 -top-10 -right-10"
            />

            <div className="relative flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-ink-800 border border-ember-500/40 flex items-center justify-center shrink-0">
                    <User size={18} className="text-ember-400" />
                </div>

                <h2 className="font-display text-xl font-semibold text-ash-100">
                    Player
                </h2>
            </div>

            <div className="relative space-y-5">
                <StatBar
                    icon={Heart}
                    label="Health"
                    value={player.health}
                    max={player.max_health}
                    accent={lowHealth ? "danger" : "ember"}
                />
            </div>

            {lowHealth && (
                <p className="relative mt-5 text-xs text-danger-400 font-medium">
                    Critical -- one wrong choice could end this story.
                </p>
            )}

        </div>
    );
}
