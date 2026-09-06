
import { signUpUser } from "../services/todoServices";
import { useNavigate } from "react-router";
import { useState, type FormEvent } from "react";


const SignUp = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    function handleSignUp(event: FormEvent<HTMLFormElement>) {
        setLoading(true);
        event.preventDefault();
        const rawFormData = new FormData(event.currentTarget);
        const formData = Object.fromEntries(rawFormData.entries()) as {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
        };

        signUpUser(formData).then((response) => {
            console.log("Sign Up Response:", response.data);
            navigate("/login");
            event.currentTarget.reset();
        }).catch((error) => {
            console.log("Error during sign up:", error);
        }).finally(() => {
            setLoading(false);
        })
    };

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
            <section className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200 md:grid-cols-[0.9fr_1.1fr]">
                <div className="bg-indigo-600 px-6 py-10 text-white sm:px-8 md:flex md:flex-col md:justify-between">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-100">
                            Todo App
                        </p>
                        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                            Create your account
                        </h1>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-indigo-100">
                            Keep your tasks organized, plan your day clearly, and access your todo list from one place.
                        </p>
                    </div>

                    <div className="mt-10 rounded-xl bg-white/10 p-4 ring-1 ring-white/20">
                        <p className="text-sm font-semibold">Plan better every day</p>
                        <p className="mt-2 text-sm leading-6 text-indigo-100">
                            Add tasks, set dates, and track what matters without clutter.
                        </p>
                    </div>
                </div>

                <div className="px-6 py-10 sm:px-8">
                    <div className="mb-8">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                            Sign up
                        </p>
                        <h2 className="text-3xl font-bold">Get started</h2>
                    </div>

                    <form className="space-y-5" onSubmit={handleSignUp}>
                        <div>
                            <label className="mb-2 block text-sm font-medium" htmlFor="name">
                                Full name
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                type="text"
                                required
                                minLength={3}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium" htmlFor="email">
                                Email address
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                type="email"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                id="password"
                                name="password"
                                placeholder="Create a strong password"
                                type="password"
                                required
                                minLength={8}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium" htmlFor="confirmPassword">
                                Confirm password
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Repeat your password"
                                type="password"
                                required
                                minLength={8}
                            />
                        </div>

                        <button
                            className={`w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account? <span className="font-semibold text-indigo-600">Sign in</span>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default SignUp
