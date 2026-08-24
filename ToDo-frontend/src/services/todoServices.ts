const API_URL = "http://localhost:3000/todoItem";

type CreateTodoRequest = {
    task: string,
    date?: string
}

export const createTodo = async (requestBody: CreateTodoRequest) => {

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create todo')
    }

    return response.json()
}