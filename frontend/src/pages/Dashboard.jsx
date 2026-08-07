import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, BookOpen, LoaderCircle } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import StoryCard from "../components/story/StoryCard";
import Button from "../components/ui/Button";

import { getStories } from "../services/storyService";

export default function Dashboard() {

    const navigate = useNavigate();

    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadStories = async () => {

        try {

            const data = await getStories();

            setStories(data);

        } catch (err) {

            console.error(err);
            toast.error("Failed to load your stories");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        loadStories();
    }, []);

    return (

        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                    <div>

                        <h1 className="text-5xl font-bold text-white">
                            Welcome Back
                        </h1>

                        <p className="text-slate-400 mt-3 text-lg">
                            Continue your adventures or create a brand new story.
                        </p>

                    </div>

                    <Button onClick={() => navigate("/create-story")}>

                        <div className="flex items-center gap-2">

                            <Plus size={20} />

                            <span>Create Story</span>

                        </div>

                    </Button>

                </div>

                {/* Section Title */}

                <div className="flex items-center gap-3 mt-14 mb-8">

                    <BookOpen
                        size={26}
                        className="text-blue-400"
                    />

                    <h2 className="text-3xl font-bold text-white">
                        Your Stories
                    </h2>

                </div>

                {/* Empty State */}

                {
                    loading ? (

                        <div className="flex justify-center py-24">
                            <LoaderCircle
                                size={32}
                                className="animate-spin text-blue-500"
                            />
                        </div>

                    ) : stories.length === 0 ? (

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">

                            <h3 className="text-2xl font-semibold text-white">

                                No stories yet

                            </h3>

                            <p className="text-slate-400 mt-3">

                                Click "Create Story" to begin your first adventure.

                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {stories.map((story) => (

                                <StoryCard
                                    key={story._id}
                                    story={story}
                                />

                            ))}

                        </div>

                    )
                }

            </div>

        </div>

    );

}