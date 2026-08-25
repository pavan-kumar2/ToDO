import { useEffect, useState } from "react"
import { getTodos, type TodoItem } from "../services/todoServices"

const TodoList = () => {
    const [data, setData] = useState<TodoItem[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);

        getTodos()
            .then(val => setData(val.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
            {loading ? (
                <p className="text-center text-slate-600">Loading todos...</p>
            ) : (
                <ul className="mx-auto max-w-lg space-y-2">
                    {data.map(list => (
                        <li className="rounded-lg bg-white p-4 shadow-sm" key={list._id}>
                            {list.task}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}

export default TodoList