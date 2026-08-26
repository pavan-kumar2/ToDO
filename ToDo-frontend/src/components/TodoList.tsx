import { useEffect, useState } from "react"
import { deleteTodos, getTodos, type TodoItem } from "../services/todoServices"

const TodoList = () => {
    const [data, setData] = useState<TodoItem[]>([])
    const [loading, setLoading] = useState(false)
    const [delete_Todo, setDelete_Todo] = useState<{ loading: boolean, id: string }>({
        loading: false,
        id: ''
    });

    useEffect(() => {
        setLoading(true);

        getTodos()
            .then(val => setData(val.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    const deleteTodo = (id: string) => {
        setDelete_Todo({ loading: true, id: id });
        deleteTodos(id)
            .then(val => {
                if (val.data.success) {
                    const unDeleted = data.filter(todo => todo._id !== id)
                    setData(unDeleted)
                }
            })
            .catch(err => console.log(err))
            .finally(() => setDelete_Todo({ loading: false, id: id }))
    }

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
            {loading ? (
                <p className="text-center text-slate-600">Loading todos...</p>
            ) : (
                <ul className="mx-auto max-w-lg space-y-2">
                    {data.map(list => (
                        <li className="rounded-lg bg-white p-4 shadow-sm flex" key={list._id}>
                            {list.task}

                            <button className="rounded-lg px-3 py-2 transition bg-red-600 text-white ml-auto" onClick={() => deleteTodo(list._id)}>
                                {delete_Todo.loading && delete_Todo.id === list._id ? '...loading' : 'Delete'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}

export default TodoList