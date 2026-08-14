import { Sparkles, LoaderCircle } from "lucide-react";

export default function LoadingScreen({
    title = "Generating your adventure...",
    subtitle = "The AI is writing the next chapter. This may take a few seconds."
}) {

    return (

        <div className="min-h-screen bg-ink-950 flex items-center justify-center relative overflow-hidden">

            <div
                className="ambient-glow w-96 h-96 bg-ember-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            <div className="relative bg-ink-900 border border-ink-700 rounded-2xl p-10 w-full max-w-lg text-center shadow-2xl">

                <Sparkles
                    size={44}
                    className="mx-auto text-ember-400 mb-6"
                />

                <h2 className="font-display text-3xl font-semibold text-ash-100">

                    {title}

                </h2>

                <p className="text-ash-300 mt-3">

                    {subtitle}

                </p>

                <LoaderCircle
                    size={36}
                    className="animate-spin text-ember-500 mx-auto mt-8"
                />

            </div>

        </div>

    );

}
