import { LogOut, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between px-8 py-5 bg-slate-900 text-white shadow">

            <div className="flex items-center gap-3">
                <BookOpen size={30} />
                <h1 className="text-2xl font-bold">
                    StoryForge AI
                </h1>
            </div>

            <button
                onClick={logout}
                className="flex items-center gap-2 hover:text-red-400 transition"
            >
                <LogOut size={20} />
                Logout
            </button>

        </nav>
    );
}