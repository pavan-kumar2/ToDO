import { useEffect, useState } from "react"
import { deleteTodos, getTodos, updateTodo, type TodoItem } from "../services/todoServices"

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

    const toggleCompleted = (id: string, completed: boolean) => {

        const updateCompleted: boolean = !completed

        updateTodo(id, { completed: updateCompleted }).then(
            (res) => {
                if (res.data.success) {
                    setData((currentData) => currentData.map(todo => todo._id === id ? { ...todo, completed: updateCompleted } : todo))
                }
            }
        ).catch(err => console.log(err))

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

                            <div className="flex gap-3 ml-auto">

                                <input
                                    aria-label={`Mark ${list.task} as complete`}
                                    checked={list.completed}
                                    className="h-5 w-5 cursor-pointer accent-indigo-600"
                                    onChange={() => toggleCompleted(list._id, list.completed)}
                                    type="checkbox"
                                />

                                <button className="rounded-lg px-3 py-2 transition bg-red-600 text-white " onClick={() => deleteTodo(list._id)}>
                                    {delete_Todo.loading && delete_Todo.id === list._id ? '...loading' : 'Delete'}
                                </button>
                            </div>


                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}

export default TodoList