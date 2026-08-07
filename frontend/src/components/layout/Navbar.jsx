import { BookOpen, Home, PlusCircle, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {

        logout();
        navigate("/");

    };

    return (

        <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

                {/* Logo */}

                <div
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-3 cursor-pointer"
                >

                    <BookOpen
                        size={30}
                        className="text-blue-500"
                    />

                    <h1 className="text-2xl font-bold text-white">
                        StoryForge AI
                    </h1>

                </div>

                {/* Navigation */}

                <div className="flex items-center gap-8">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-2 transition ${
                                isActive
                                    ? "text-blue-400"
                                    : "text-slate-300 hover:text-white"
                            }`
                        }
                    >
                        <Home size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/create-story"
                        className={({ isActive }) =>
                            `flex items-center gap-2 transition ${
                                isActive
                                    ? "text-blue-400"
                                    : "text-slate-300 hover:text-white"
                            }`
                        }
                    >
                        <PlusCircle size={18} />
                        Create Story
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-slate-300 hover:text-red-400 transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}