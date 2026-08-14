import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Flame, Mail, Lock, User } from "lucide-react";

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
        <div className="min-h-screen flex justify-center items-center bg-ink-950 px-6 relative overflow-hidden">

            <div
                className="ambient-glow w-[32rem] h-[32rem] bg-ember-500/15 top-1/4 left-1/2 -translate-x-1/2"
            />
            <div
                className="ambient-glow w-72 h-72 bg-arcane-500/10 bottom-0 right-0"
            />

            <form
                onSubmit={handleSubmit}
                className="relative bg-ink-900 border border-ink-700 p-10 rounded-2xl shadow-2xl w-full max-w-md"
            >

                <div className="flex flex-col items-center mb-8">
                    <Flame size={40} className="text-ember-500 mb-3" />
                    <h1 className="font-display text-3xl font-semibold text-ash-100">
                        Create Account
                    </h1>
                    <p className="text-ash-300 mt-2 text-center">
                        Begin your own AI-powered adventure.
                    </p>
                </div>

                <label className="text-ash-300 text-sm mb-2 flex items-center gap-2">
                    <User size={16} />
                    Username
                </label>
                <input
                    className="bg-ink-950 border border-ink-700 text-ash-100 p-3 w-full mb-5 rounded-lg outline-none focus:border-ember-500 transition"
                    type="text"
                    name="username"
                    placeholder="storyteller99"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

                <label className="text-ash-300 text-sm mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    Email
                </label>
                <input
                    className="bg-ink-950 border border-ink-700 text-ash-100 p-3 w-full mb-5 rounded-lg outline-none focus:border-ember-500 transition"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label className="text-ash-300 text-sm mb-2 flex items-center gap-2">
                    <Lock size={16} />
                    Password
                </label>
                <input
                    className="bg-ink-950 border border-ink-700 text-ash-100 p-3 w-full mb-8 rounded-lg outline-none focus:border-ember-500 transition"
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
                    className="bg-gradient-to-b from-ember-400 to-ember-500 hover:shadow-[0_0_20px_rgba(232,98,44,0.4)] disabled:opacity-50 disabled:cursor-not-allowed text-ink-950 w-full p-3 rounded-lg font-semibold transition-all"
                >
                    {submitting ? "Creating account..." : "Create Account"}
                </button>

                <p className="mt-6 text-center text-ash-300">
                    Already have an account?
                    <Link
                        className="text-ember-400 hover:text-ember-300 ml-2 font-medium"
                        to="/"
                    >
                        Log in
                    </Link>
                </p>

            </form>

        </div>
    );
}
