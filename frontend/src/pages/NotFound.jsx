import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
            <div className="text-center">
                <Compass
                    size={56}
                    className="mx-auto text-blue-500 mb-6"
                />

                <h1 className="text-5xl font-bold text-white">
                    Lost in the story
                </h1>

                <p className="text-slate-400 mt-4 text-lg">
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
