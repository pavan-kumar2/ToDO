import { useState, type MouseEvent } from "react";
import { createTodo } from "../services/todoServices";

const CreateTodo = () => {
    const [task, setTask] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const submit = async (e: MouseEvent<HTMLButtonElement>) => {
        setLoading(true)
        e.preventDefault()
        createTodo({ task, date })
            .then(val => console.log(val))
            .catch(er => console.log(er))
            .finally(() => setLoading(false))
    }

    return (
        <main className="min-h-screen
         bg-slate-100 px-4 py-12 text-slate-900">
            <section className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg shadow-slate-200">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                    Todo list
                </p>
                <h1 className="mb-6 text-3xl font-bold">Create a todo</h1>

                <form className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium" htmlFor="task">
                            Task
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            id="task"
                            placeholder="What needs to be done?"
                            type="text"
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium" htmlFor="date">
                            Due date <span className="font-normal text-slate-500">(optional)</span>
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            id="date"
                            type="datetime-local"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        type="submit"
                        onClick={submit}
                    >
                        {loading ? 'loading...' : 'Create todo'}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default CreateTodo