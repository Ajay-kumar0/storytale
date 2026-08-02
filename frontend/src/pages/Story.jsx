import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { continueStory } from "../services/storyService";
import { getStory } from "../services/storyService";

export default function Story() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [storyData, setStoryData] = useState(null);

    useEffect(() => {

        loadStory();

    }, []);

    const loadStory = async () => {

        try {

            const data = await getStory(id);

            setStoryData(data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
                Loading Story...
            </div>
        );
    }

    const handleChoice = async (choiceId) => {

    try {

        setLoading(true);

        const nextChapter = await continueStory(
            id,
            choiceId
        );

        setStoryData((prev) => ({
            ...prev,
            chapter: nextChapter,
        }));

    } catch (err) {

        console.error(err);

    } finally {

        setLoading(false);

    }

};

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <div className="max-w-5xl mx-auto p-10">

                <h1 className="text-5xl font-bold">
                    {storyData.story.title}
                </h1>

                <p className="text-slate-400 mt-2">
                    {storyData.story.genre}
                </p>

                <div className="mt-10 bg-slate-900 rounded-xl p-8">

                    <h2 className="text-3xl font-bold mb-6">
                        {storyData.chapter.title}
                    </h2>

                    <p className="leading-8 whitespace-pre-wrap">
                        {storyData.chapter.story}
                    </p>

                    <div className="mt-10">

                        <h3 className="text-2xl font-semibold mb-4">
                            Choose Your Next Action
                        </h3>

                        <div className="space-y-4">

                            {storyData.chapter.choices.map((choice) => (

                                <button
                                    key={choice.id}
                                    onClick={() => handleChoice(choice.id)}
                                    className="w-full bg-slate-800 hover:bg-slate-700 p-4 rounded-lg text-left transition"
                                >
                                    {choice.text}
                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}