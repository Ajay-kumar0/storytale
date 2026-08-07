import { Heart } from "lucide-react";
import StatBar from "./StatBar";

export default function PlayerCard({ player }) {

    return (
        <div className="bg-slate-900 rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6">
                Player
            </h2>

            <StatBar
                icon={Heart}
                label="Health"
                value={player.health}
                max={player.max_health}
                color="text-red-500"
            />

        </div>
    );
}