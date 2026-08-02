import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../services/authService";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await login(form);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.detail ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    StoryForge AI
                </h1>

                <input
                    className="border p-3 w-full mb-4 rounded"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    className="border p-3 w-full mb-6 rounded"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button
                    className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700"
                >
                    Login
                </button>

                <p className="mt-4 text-center">

                    Don't have an account?

                    <Link
                        className="text-blue-600 ml-2"
                        to="/register"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
}