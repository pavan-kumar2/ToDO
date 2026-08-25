import { Link, useLocation } from "react-router";

const Navigation = () => {
    const location = useLocation();
    const linkClass = (path: string) =>
        `rounded-lg px-3 py-2 transition ${location.pathname === path
            ? "bg-indigo-600 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <nav className="border-b border-slate-200 bg-white shadow-sm">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <Link className="text-xl font-bold tracking-tight text-slate-900" to="/">
                    Todo App
                </Link>
                <div className="flex items-center gap-2 text-sm font-medium">
                    <Link className={linkClass("/")} to="/">
                        List
                    </Link>
                    <Link className={linkClass("/create")} to="/create">
                        Create
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation