import { useNavigate } from "react-router-dom";
import { BookOpen, User, ArrowRight } from "lucide-react";

export default function StoryCard({ story }) {

    const navigate = useNavigate();

    return (

        <div
            onClick={() => navigate(`/story/${story._id}`)}
            className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >

            <div className="flex justify-between items-start">

                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition">

                    {story.title}

                </h2>

                <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">

                    {story.genre}

                </span>

            </div>

            <div className="mt-6 space-y-3">

                <div className="flex items-center gap-3 text-slate-300">

                    <User size={18} />

                    <span>{story.character_name}</span>

                </div>

                <div className="flex items-center gap-3 text-slate-300">

                    <BookOpen size={18} />

                    <span>Chapter {story.current_chapter}</span>

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >

                    Continue

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>

    );

}