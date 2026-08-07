import { LoaderCircle, Sparkles } from "lucide-react";

export default function LoadingScreen({
    title = "Generating your adventure...",
    subtitle = "The AI is writing the next chapter. This may take a few seconds."
}) {

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 w-full max-w-lg text-center shadow-2xl">

                <Sparkles
                    size={45}
                    className="mx-auto text-blue-500 mb-6"
                />

                <h2 className="text-3xl font-bold text-white">

                    {title}

                </h2>

                <p className="text-slate-400 mt-3">

                    {subtitle}

                </p>

                <LoaderCircle
                    size={40}
                    className="animate-spin text-blue-500 mx-auto mt-8"
                />

            </div>

        </div>

    );

}