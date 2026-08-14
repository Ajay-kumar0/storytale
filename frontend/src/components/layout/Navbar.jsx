import { Flame, Home, PlusCircle, LogOut } from "lucide-react";
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

        <nav className="sticky top-0 z-50 bg-ink-900/90 backdrop-blur border-b border-ink-700">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

                {/* Logo */}

                <div
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-3 cursor-pointer group"
                >

                    <Flame
                        size={28}
                        className="text-ember-500 group-hover:text-ember-400 transition"
                    />

                    <h1 className="font-display text-2xl font-semibold text-ash-100 tracking-tight">
                        StoryTale
                    </h1>

                </div>

                {/* Navigation */}

                <div className="flex items-center gap-8 font-medium text-sm">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-2 transition ${
                                isActive
                                    ? "text-ember-400"
                                    : "text-ash-300 hover:text-ash-100"
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
                                    ? "text-ember-400"
                                    : "text-ash-300 hover:text-ash-100"
                            }`
                        }
                    >
                        <PlusCircle size={18} />
                        Create Story
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-ash-300 hover:text-danger-400 transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}
