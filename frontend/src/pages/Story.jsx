import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Play,
    Pause,
    Square,
    LoaderCircle,
    ArrowRight,
    Languages,
} from "lucide-react";

import {
    getStory,
    continueStory,
    generateStory,
    translateStory,
} from "../services/storyService";
import Navbar from "../components/layout/Navbar";
import PlayerCard from "../components/player/PlayerCard";
import LoadingScreen from "../components/ui/LoadingScreen";

export default function Story() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [pageLoading, setPageLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    const [storyData, setStoryData] = useState(null);
    const [language, setLanguage] = useState("English");
    const [displayStory, setDisplayStory] = useState("");
    const [translating, setTranslating] = useState(false);

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [retrying, setRetrying] = useState(false);

    const loadStory = async () => {

        try {

            const data = await getStory(id);

            setStoryData(data);
            setDisplayStory(data.chapter?.story ?? "");

        } catch (err) {

            console.error(err);
            toast.error("Failed to load this story");

        } finally {

            setPageLoading(false);

        }

    };

    useEffect(() => {
        loadStory();
    }, []);

    const speakStory = () => {

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(
            displayStory
        );

        utterance.lang =
            language === "Hindi"
                ? "hi-IN"
                : "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onend = () => {

            setIsSpeaking(false);
            setIsPaused(false);

        };

        window.speechSynthesis.speak(utterance);

        setIsSpeaking(true);
        setIsPaused(false);

    };

    const pauseResume = () => {

        if (!isSpeaking) {

            speakStory();
            return;

        }

        if (isPaused) {

            window.speechSynthesis.resume();
            setIsPaused(false);

        } else {

            window.speechSynthesis.pause();
            setIsPaused(true);

        }

    };

    const stopStory = () => {

        window.speechSynthesis.cancel();

        setIsSpeaking(false);
        setIsPaused(false);

    };

    const changeLanguage = async (lang) => {

        if (lang === language) return;

        stopStory();

        if (lang === "English") {

            setDisplayStory(storyData.chapter.story);
            setLanguage("English");
            return;

        }

        try {

            setTranslating(true);

            const result = await translateStory(
                storyData.chapter.story,
                "Hindi"
            );

            setDisplayStory(result.translated_text);
            setLanguage("Hindi");

        } catch (err) {

            console.error(err);
            toast.error("Translation failed");

        } finally {

            setTranslating(false);

        }

    };

    const handleChoice = async (choiceId) => {

        try {

            setGenerating(true);

            stopStory();

            const data = await continueStory(
                id,
                choiceId
            );

            setStoryData((prev) => ({
                ...prev,
                chapter: data.chapter,
                player: data.player,
            }));

            setDisplayStory(data.chapter.story);
            setLanguage("English");

        } catch (err) {

            console.error(err);
            toast.error("Failed to continue the story");

        } finally {

            setGenerating(false);

        }

    };

    const retryGenerate = async () => {

        try {

            setRetrying(true);

            const data = await generateStory(id);

            setStoryData((prev) => ({
                ...prev,
                chapter: data.chapter,
                player: data.player,
            }));

            setDisplayStory(data.chapter.story);

        } catch (err) {

            console.error(err);
            toast.error("Failed to generate the first chapter");

        } finally {

            setRetrying(false);

        }

    };

    if (pageLoading) {

        return (
            <LoadingScreen
                title="Loading your adventure..."
                subtitle="Preparing your story..."
            />
        );

    }

    if (!storyData?.chapter) {

        return (
            <div className="min-h-screen bg-ink-950">

                <Navbar />

                <div className="flex items-center justify-center px-6 py-20">
                    <div className="bg-ink-900 border border-ink-700 rounded-2xl p-10 max-w-md text-center">

                        <h2 className="font-display text-2xl font-semibold text-ash-100">
                            This story hasn't started yet
                        </h2>

                        <p className="text-ash-300 mt-3">
                            Its first chapter failed to generate. You can try again.
                        </p>

                        <button
                            onClick={retryGenerate}
                            disabled={retrying}
                            className="mt-8 bg-gradient-to-b from-ember-400 to-ember-500 hover:shadow-[0_0_20px_rgba(232,98,44,0.4)] disabled:opacity-50 text-ink-950 px-6 py-3 rounded-xl font-semibold transition-all"
                        >
                            {retrying ? "Generating..." : "Generate First Chapter"}
                        </button>

                    </div>
                </div>
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-ink-950 text-ash-100">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT PANEL */}

                    <div className="lg:col-span-2">

                        <h1 className="font-display text-5xl font-semibold">
                            {storyData.story.title}
                        </h1>

                        <p className="text-ash-300 mt-3 text-sm uppercase tracking-wider font-medium">
                            {storyData.story.genre}
                            <span className="text-ember-500 mx-2">&bull;</span>
                            {storyData.story.character_name}
                            <span className="text-ember-500 mx-2">&bull;</span>
                            Chapter {storyData.chapter.chapter}
                        </p>

                        <div className="mt-8 relative bg-ink-900 border border-ink-700 rounded-2xl shadow-xl overflow-hidden">

                            {/* Illuminated top edge */}
                            <div className="h-1 bg-gradient-to-r from-ember-600 via-ember-400 to-ember-600" />

                            <div className="p-10">

                                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">

                                    <h2 className="font-display text-3xl font-semibold">
                                        {storyData.chapter.title}
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-3">

                                        <div className="flex gap-1 bg-ink-950 border border-ink-700 rounded-lg p-1">

                                            <button
                                                onClick={() => changeLanguage("English")}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                                                    language === "English"
                                                        ? "bg-ember-500 text-ink-950"
                                                        : "text-ash-300 hover:text-ash-100"
                                                }`}
                                            >
                                                English
                                            </button>

                                            <button
                                                onClick={() => changeLanguage("Hindi")}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                                                    language === "Hindi"
                                                        ? "bg-ember-500 text-ink-950"
                                                        : "text-ash-300 hover:text-ash-100"
                                                }`}
                                            >
                                                हिन्दी
                                            </button>

                                        </div>

                                        {!storyData.chapter.game_over && (

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={pauseResume}
                                                    className="flex items-center gap-2 bg-ink-800 hover:bg-ink-700 border border-ink-700 px-4 py-2 rounded-lg transition text-sm font-medium"
                                                >
                                                    {isSpeaking && !isPaused ? (
                                                        <>
                                                            <Pause size={16} />
                                                            Pause
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Play size={16} />
                                                            {isPaused ? "Resume" : "Read"}
                                                        </>
                                                    )}
                                                </button>

                                                <button
                                                    onClick={stopStory}
                                                    disabled={!isSpeaking}
                                                    className="flex items-center gap-2 bg-danger-600/20 text-danger-400 hover:bg-danger-600/30 disabled:opacity-40 disabled:hover:bg-danger-600/20 border border-danger-600/30 px-4 py-2 rounded-lg transition text-sm font-medium"
                                                >
                                                    <Square size={16} />
                                                    Stop
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                </div>

                                {translating && (

                                    <div className="mb-4 flex items-center gap-2 text-arcane-400 text-sm">
                                        <Languages size={16} className="animate-pulse" />
                                        Translating to Hindi...
                                    </div>

                                )}

                                <p className="font-prose text-lg leading-9 text-ash-100/90 whitespace-pre-wrap prose-illuminated">
                                    {displayStory}
                                </p>

                                <div className="mt-12">

                                    {storyData.chapter.game_over ? (

                                        <div className="bg-ink-950 border border-danger-500/40 rounded-2xl p-8 text-center relative overflow-hidden">

                                            <div
                                                className="ambient-glow w-64 h-64 bg-danger-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />

                                            <h2 className="relative font-display text-4xl font-semibold text-danger-400">
                                                The Story Has Ended
                                            </h2>

                                            <p className="relative mt-5 text-lg text-ash-100/90">
                                                Your health has reached zero.
                                            </p>

                                            <p className="relative mt-2 text-ash-300">
                                                Your adventure has come to an end.
                                                Every choice you made shaped this story.
                                            </p>

                                            <button
                                                onClick={() => navigate("/create-story")}
                                                className="relative mt-8 bg-gradient-to-b from-ember-400 to-ember-500 hover:shadow-[0_0_20px_rgba(232,98,44,0.4)] text-ink-950 px-8 py-3 rounded-xl font-semibold transition-all"
                                            >
                                                Create New Story
                                            </button>

                                        </div>

                                    ) : (

                                        <>

                                            <h3 className="font-display text-2xl font-semibold mb-6">
                                                Choose Your Next Action
                                            </h3>

                                            {generating && (

                                                <div className="flex items-center gap-3 bg-ember-500/10 border border-ember-500/30 rounded-xl p-4 mb-6">

                                                    <LoaderCircle
                                                        className="animate-spin text-ember-400"
                                                        size={20}
                                                    />

                                                    <span className="text-sm">
                                                        Generating the next chapter...
                                                    </span>

                                                </div>

                                            )}

                                            <div className="space-y-3">

                                                {storyData.chapter.choices.map((choice) => (

                                                    <button
                                                        key={choice.id}
                                                        disabled={generating}
                                                        onClick={() => handleChoice(choice.id)}
                                                        className={`group w-full flex items-center gap-4 rounded-xl border p-5 text-left transition-all ${
                                                            generating
                                                                ? "bg-ink-900 border-ink-700 opacity-50 cursor-not-allowed"
                                                                : "bg-ink-900 border-ink-700 hover:border-ember-500/60 hover:bg-ink-800 hover:translate-x-1"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`shrink-0 w-1 self-stretch rounded-full transition-colors ${
                                                                generating
                                                                    ? "bg-ink-700"
                                                                    : "bg-ink-700 group-hover:bg-ember-500"
                                                            }`}
                                                        />

                                                        <span className="flex-1 text-ash-100/90">
                                                            {choice.text}
                                                        </span>

                                                        <ArrowRight
                                                            size={18}
                                                            className={`shrink-0 text-ash-500 transition-all ${
                                                                generating
                                                                    ? ""
                                                                    : "group-hover:text-ember-400 group-hover:translate-x-1"
                                                            }`}
                                                        />
                                                    </button>

                                                ))}

                                            </div>

                                        </>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT PANEL */}

                    <div>

                        <PlayerCard player={storyData.player} />

                    </div>

                </div>

            </div>

        </div>

    );

}
