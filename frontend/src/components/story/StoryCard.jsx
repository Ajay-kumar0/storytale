import { useNavigate } from "react-router-dom";
import { BookOpen, User, ArrowRight } from "lucide-react";

export default function StoryCard({ story }) {

    const navigate = useNavigate();

    return (

        <div
            onClick={() => navigate(`/story/${story._id}`)}
            className="group relative bg-ink-900 border border-ink-700 rounded-2xl p-6 cursor-pointer hover:border-ember-500/60 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(232,98,44,0.15)] transition-all duration-300"
        >

            <div className="flex justify-between items-start gap-4">

                <h2 className="font-display text-2xl font-semibold text-ash-100 group-hover:text-ember-400 transition-colors">

                    {story.title}

                </h2>

                <span className="shrink-0 bg-ember-500/15 text-ember-400 border border-ember-500/30 text-xs font-semibold px-3 py-1 rounded-full">

                    {story.genre}

                </span>

            </div>

            <div className="mt-6 space-y-3">

                <div className="flex items-center gap-3 text-ash-300 text-sm">

                    <User size={16} className="text-ash-500" />

                    <span>{story.character_name}</span>

                </div>

                <div className="flex items-center gap-3 text-ash-300 text-sm">

                    <BookOpen size={16} className="text-ash-500" />

                    <span>Chapter {story.current_chapter}</span>

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <span
                    className="flex items-center gap-2 text-ember-400 group-hover:text-ember-300 font-medium text-sm transition-colors"
                >

                    Continue

                    <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                    />

                </span>

            </div>

        </div>

    );

}
