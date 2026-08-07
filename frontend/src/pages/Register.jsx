import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BookOpen, Mail, Lock, User } from "lucide-react";

import { register, login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export default function Register() {

    const navigate = useNavigate();
    const auth = useAuth();

    const [form, setForm] = useState({
        username: "",
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

        if (form.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {

            setSubmitting(true);

            await register(form);

            // Register a new user, then log them straight in so they
            // land on the dashboard instead of having to sign in twice.
            const data = await login({
                email: form.email,
                password: form.password,
            });

            auth.login(data.access_token);

            toast.success("Account created!");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.detail ||
                "Registration failed"
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
                        Create Account
                    </h1>
                    <p className="text-slate-400 mt-2 text-center">
                        Begin your own AI-powered adventure.
                    </p>
                </div>

                <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
                    <User size={16} />
                    Username
                </label>
                <input
                    className="bg-slate-800 border border-slate-700 text-white p-3 w-full mb-5 rounded-lg outline-none focus:border-blue-500 transition"
                    type="text"
                    name="username"
                    placeholder="storyteller99"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

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
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white w-full p-3 rounded-lg font-medium transition"
                >
                    {submitting ? "Creating account..." : "Create Account"}
                </button>

                <p className="mt-6 text-center text-slate-400">
                    Already have an account?
                    <Link
                        className="text-blue-400 hover:text-blue-300 ml-2"
                        to="/"
                    >
                        Log in
                    </Link>
                </p>

            </form>

        </div>
    );
}
