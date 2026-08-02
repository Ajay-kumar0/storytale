import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import StoryCard from "../components/story/StoryCard";
import Button from "../components/ui/Button";

import { getStories } from "../services/storyService";

export default function Dashboard() {

    const navigate = useNavigate();

    const [stories, setStories] = useState([]);

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        try {
            const data = await getStories();
            console.log("Stories:", data);
            setStories(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                <div className="flex justify-between items-center">

                    <div>
                        <h1 className="text-4xl text-white font-bold">
                            Welcome Back
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Continue your adventure or create a new one.
                        </p>
                    </div>

                    <Button onClick={() => navigate("/create-story")}>
                        + Create Story
                    </Button>

                </div>

                <h2 className="text-white text-2xl mt-12 mb-6">
                    Recent Stories
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {stories.map((story) => (
                        <StoryCard
                            key={story._id}
                            story={story}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
}