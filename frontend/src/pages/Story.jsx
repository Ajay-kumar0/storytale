import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Play,
    Pause,
    Square,
    LoaderCircle,
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
            <div className="min-h-screen bg-slate-950">

                <Navbar />

                <div className="flex items-center justify-center px-6 py-20">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 max-w-md text-center">

                        <h2 className="text-2xl font-bold text-white">
                            This story hasn't started yet
                        </h2>

                        <p className="text-slate-400 mt-3">
                            Its first chapter failed to generate. You can try again.
                        </p>

                        <button
                            onClick={retryGenerate}
                            disabled={retrying}
                            className="mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-6 py-3 rounded-xl font-semibold transition"
                        >
                            {retrying ? "Generating..." : "Generate First Chapter"}
                        </button>

                    </div>
                </div>
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT PANEL */}

                    <div className="lg:col-span-2">

                        <h1 className="text-5xl font-bold">
                            {storyData.story.title}
                        </h1>

                        <p className="text-slate-400 mt-3">
                            {storyData.story.genre}
                            {" • "}
                            {storyData.story.character_name}
                            {" • "}
                            Chapter {storyData.chapter.chapter}
                        </p>

                        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-10">

                            <div className="flex justify-between items-center mb-8">

                                <h2 className="text-3xl font-bold">
                                    {storyData.chapter.title}
                                </h2>
                                <div className="flex gap-2 mt-3">

                                    <button
                                        onClick={() => changeLanguage("English")}
                                        className={`px-3 py-1 rounded ${
                                            language === "English"
                                                ? "bg-blue-600"
                                                : "bg-slate-700"
                                        }`}
                                    >
                                        English
                                    </button>

                                    <button
                                        onClick={() => changeLanguage("Hindi")}
                                        className={`px-3 py-1 rounded ${
                                            language === "Hindi"
                                                ? "bg-blue-600"
                                                : "bg-slate-700"
                                        }`}
                                    >
                                        हिन्दी
                                    </button>

                                </div>

                                {!storyData.chapter.game_over && (

                                    <div className="flex gap-3">

                                        <button
                                            onClick={pauseResume}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
                                        >
                                            {isSpeaking && !isPaused ? (
                                                <>
                                                    <Pause size={18} />
                                                    Pause
                                                </>
                                            ) : (
                                                <>
                                                    <Play size={18} />
                                                    {isPaused ? "Resume" : "Read"}
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={stopStory}
                                            disabled={!isSpeaking}
                                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 px-5 py-2 rounded-lg transition"
                                        >
                                            <Square size={18} />
                                            Stop
                                        </button>

                                    </div>

                                )}

                            </div>

                            {translating && (

                                <div className="mb-4 text-blue-400">
                                    Translating to Hindi...
                                </div>

                            )}

                            <p className="text-lg leading-9 text-slate-200 whitespace-pre-wrap">
                                {displayStory}
                            </p>

                            <div className="mt-12">

                                {storyData.chapter.game_over ? (

                                    <div className="bg-slate-800 border border-red-500 rounded-2xl p-8 text-center">

                                        <h2 className="text-4xl font-bold text-red-400">
                                            The Story Has Ended
                                        </h2>

                                        <p className="mt-5 text-lg text-slate-300">
                                            Your health has reached zero.
                                        </p>

                                        <p className="mt-2 text-slate-400">
                                            Your adventure has come to an end.
                                            Every choice you made shaped this story.
                                        </p>

                                        <button
                                            onClick={() => navigate("/create-story")}
                                            className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
                                        >
                                            Create New Story
                                        </button>

                                    </div>

                                ) : (

                                    <>

                                        <h3 className="text-2xl font-semibold mb-6">
                                            Choose Your Next Action
                                        </h3>

                                        {generating && (

                                            <div className="flex items-center gap-3 bg-blue-900/30 border border-blue-600 rounded-xl p-4 mb-6">

                                                <LoaderCircle
                                                    className="animate-spin"
                                                    size={22}
                                                />

                                                <span>
                                                    Generating the next chapter...
                                                </span>

                                            </div>

                                        )}

                                        <div className="space-y-4">

                                            {storyData.chapter.choices.map((choice) => (

                                                <button
                                                    key={choice.id}
                                                    disabled={generating}
                                                    onClick={() => handleChoice(choice.id)}
                                                    className={`w-full rounded-xl border p-5 text-left transition ${
                                                        generating
                                                            ? "bg-slate-700 border-slate-700 opacity-60 cursor-not-allowed"
                                                            : "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-blue-500"
                                                    }`}
                                                >
                                                    {choice.text}
                                                </button>

                                            ))}

                                        </div>

                                    </>

                                )}

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