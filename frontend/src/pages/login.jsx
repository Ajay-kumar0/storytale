import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BookOpen, Mail, Lock } from "lucide-react";

import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export default function Login() {

    const navigate = useNavigate();
    const auth = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSubmitting(true);

            const data = await login(form);

            auth.login(data.access_token);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.detail ||
                "Login Failed"
            );

        } finally {

            setSubmitting(false);

        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-950 px-6">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 border border-slate-800 p-10 rounded-2xl shadow-2xl w-full max-w-md"
            >

                <div className="flex flex-col items-center mb-8">
                    <BookOpen size={40} className="text-blue-500 mb-3" />
                    <h1 className="text-3xl font-bold text-white">
                        StoryForge AI
                    </h1>
                    <p className="text-slate-400 mt-2 text-center">
                        Welcome back, adventurer.
                    </p>
                </div>

                <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    Email
                </label>
                <input
                    className="bg-slate-800 border border-slate-700 text-white p-3 w-full mb-5 rounded-lg outline-none focus:border-blue-500 transition"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
                    <Lock size={16} />
                    Password
                </label>
                <input
                    className="bg-slate-800 border border-slate-700 text-white p-3 w-full mb-8 rounded-lg outline-none focus:border-blue-500 transition"
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white w-full p-3 rounded-lg font-medium transition"
                >
                    {submitting ? "Logging in..." : "Login"}
                </button>

                <p className="mt-6 text-center text-slate-400">
                    Don't have an account?
                    <Link
                        className="text-blue-400 hover:text-blue-300 ml-2"
                        to="/register"
                    >
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
}
