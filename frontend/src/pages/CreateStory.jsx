import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingScreen from "../components/ui/LoadingScreen";

import {
    Sparkles,
    BookOpen,
    Globe,
    User,
    Shield,
    Swords,
} from "lucide-react";

import {
    createStory,
    generateStory,
} from "../services/storyService";

const fieldClass =
    "w-full bg-ink-950 border border-ink-700 rounded-lg p-3 text-ash-100 outline-none focus:border-ember-500 transition";

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

            toast.loading("Creating your adventure...", {
                id: "story",
            });

            const story = await createStory(form);

            toast.loading("AI is writing your story...", {
                id: "story",
            });

            await generateStory(story.story_id);

            toast.success("Adventure Ready!", {
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

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <LoadingScreen
                title="Creating your adventure..."
                subtitle="Our AI is building your world. This may take a few seconds."
            />
        );

    }

    return (

        <div className="min-h-screen bg-ink-950 flex items-center justify-center px-6 py-10 relative overflow-hidden">

            <div
                className="ambient-glow w-[36rem] h-[36rem] bg-ember-500/10 top-0 right-0"
            />

            <div className="relative w-full max-w-3xl bg-ink-900 border border-ink-700 rounded-2xl shadow-2xl p-10">

                <div className="flex items-center gap-3 mb-8">

                    <Sparkles
                        size={32}
                        className="text-ember-500"
                    />

                    <div>

                        <h1 className="font-display text-4xl font-semibold text-ash-100">
                            Create Your Adventure
                        </h1>

                        <p className="text-ash-300 mt-1">
                            Design your hero and let AI build your story.
                        </p>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="text-ash-300 text-sm mb-2 flex items-center gap-2">
                            <BookOpen size={16} />
                            Story Title
                        </label>

                        <input
                            className={fieldClass}
                            placeholder="The Lost Kingdom"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label className="text-ash-300 text-sm mb-2 flex items-center gap-2">
                            <User size={16} />
                            Character Name
                        </label>

                        <input
                            className={fieldClass}
                            placeholder="Arthur"
                            name="character_name"
                            value={form.character_name}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label className="text-ash-300 text-sm mb-2">
                            Genre
                        </label>

                        <select
                            className={fieldClass}
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

                    </div>

                    <div>

                        <label className="text-ash-300 text-sm mb-2 flex items-center gap-2">
                            <Globe size={16} />
                            World
                        </label>

                        <select
                            className={fieldClass}
                            name="world"
                            value={form.world}
                            onChange={handleChange}
                        >
                            <option>Ancient Kingdom</option>
                            <option>Haunted City</option>
                            <option>Future Earth</option>
                            <option>Lost Island</option>
                        </select>

                    </div>

                    <div>

                        <label className="text-ash-300 text-sm mb-2 flex items-center gap-2">
                            <Shield size={16} />
                            Character Class
                        </label>

                        <select
                            className={fieldClass}
                            name="character_class"
                            value={form.character_class}
                            onChange={handleChange}
                        >
                            <option>Knight</option>
                            <option>Mage</option>
                            <option>Archer</option>
                            <option>Assassin</option>
                        </select>

                    </div>

                    <div>

                        <label className="text-ash-300 text-sm mb-2 flex items-center gap-2">
                            <Swords size={16} />
                            Difficulty
                        </label>

                        <select
                            className={fieldClass}
                            name="difficulty"
                            value={form.difficulty}
                            onChange={handleChange}
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>

                    </div>

                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-10 w-full bg-gradient-to-b from-ember-400 to-ember-500 hover:shadow-[0_0_20px_rgba(232,98,44,0.4)] disabled:opacity-50 text-ink-950 rounded-xl py-4 text-lg font-semibold transition-all"
                >
                    Start Adventure
                </button>

            </div>

        </div>

    );

}
