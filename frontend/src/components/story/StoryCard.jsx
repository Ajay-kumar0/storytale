import { useNavigate } from "react-router-dom";

export default function StoryCard({ story }) {

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/story/${story._id}`)}
            className="bg-slate-800 rounded-xl p-6 text-white hover:scale-105 transition cursor-pointer"
        >
            <h2 className="text-xl font-semibold">
                {story.title}
            </h2>

            <p className="mt-2 text-slate-400">
                {story.genre}
            </p>

            <p className="mt-2">
                {story.character_name}
            </p>

            <button className="mt-5 text-blue-400">
                Continue →
            </button>
        </div>
    );
}