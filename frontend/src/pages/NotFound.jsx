import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-ink-950 flex items-center justify-center px-6 relative overflow-hidden">

            <div
                className="ambient-glow w-96 h-96 bg-ember-500/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            <div className="relative text-center">
                <Compass
                    size={52}
                    className="mx-auto text-ember-400 mb-6"
                />

                <h1 className="font-display text-5xl font-semibold text-ash-100">
                    Lost in the story
                </h1>

                <p className="text-ash-300 mt-4 text-lg">
                    This page doesn't exist.
                </p>

                <div className="mt-8 flex justify-center">
                    <Button onClick={() => navigate("/dashboard")}>
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}
