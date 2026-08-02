export default function StoryCard({
    title,
    genre,
    chapter,
}) {
    return (
        <div className="bg-slate-800 rounded-xl p-6 text-white hover:scale-105 transition">

            <h2 className="text-xl font-semibold">
                {title}
            </h2>

            <p className="mt-2 text-slate-400">
                {genre}
            </p>

            <p className="mt-4">
                Chapter {chapter}
            </p>

            <button
                className="mt-5 text-blue-400"
            >
                Continue →
            </button>

        </div>
    );
}