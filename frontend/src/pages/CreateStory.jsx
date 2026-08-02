import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createStory, generateStory } from "../services/storyService";

export default function CreateStory() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const [form, setForm] = useState({
        title: "",
        genre: "Fantasy",
        world: "Ancient Kingdom",
        character_name: "",
        character_class: "Knight",
        difficulty: "Medium",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {

        if (!form.title.trim()) {
            toast.error("Please enter a story title");
            return;
        }

        if (!form.character_name.trim()) {
            toast.error("Please enter a character name");
            return;
        }

        try {

            setLoading(true);

            toast.loading("Creating story...", {
                id: "story",
            });

            const story = await createStory(form);

            toast.loading("Generating AI adventure...", {
                id: "story",
            });

            await generateStory(story.story_id);

            toast.success("Adventure Created!", {
                id: "story",
            });

            navigate(`/story/${story.story_id}`);

        } catch (err) {

            toast.error(
                err.response?.data?.detail ||
                "Failed to create story",
                {
                    id: "story",
                }
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center">

            <div className="bg-slate-900 p-10 rounded-xl w-full max-w-xl">

                <h1 className="text-white text-3xl font-bold mb-8">
                    Create Story
                </h1>

                <input
                    className="w-full p-3 rounded mb-4"
                    placeholder="Story Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />

                <select
                    className="w-full p-3 rounded mb-4"
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                >
                    <option>Fantasy</option>
                    <option>Horror</option>
                    <option>Sci-Fi</option>
                    <option>Mystery</option>
                    <option>Cyberpunk</option>
                </select>

                <select
                    className="w-full p-3 rounded mb-4"
                    name="world"
                    value={form.world}
                    onChange={handleChange}
                >
                    <option>Ancient Kingdom</option>
                    <option>Haunted City</option>
                    <option>Future Earth</option>
                    <option>Lost Island</option>
                </select>

                <input
                    className="w-full p-3 rounded mb-4"
                    placeholder="Character Name"
                    name="character_name"
                    value={form.character_name}
                    onChange={handleChange}
                />

                <select
                    className="w-full p-3 rounded mb-4"
                    name="character_class"
                    value={form.character_class}
                    onChange={handleChange}
                >
                    <option>Knight</option>
                    <option>Mage</option>
                    <option>Archer</option>
                    <option>Assassin</option>
                </select>

                <select
                    className="w-full p-3 rounded mb-6"
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded disabled:opacity-50"
                >
                    {loading ? "Generating..." : "Generate Adventure"}
                </button>

            </div>

        </div>

    );
}