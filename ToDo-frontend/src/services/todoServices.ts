import axios, { type AxiosResponse } from "axios";

const API_URL = "http://localhost:3000/todoItem";

export interface TodoItem {
    _id: string;
    task: string;
    date?: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

interface CreateTodoRequest {
    task: string;
    date?: string;
}

interface DeleteTodoResponse {
    message: string
    success: boolean
}

export const createTodo = async (requestBody: CreateTodoRequest): Promise<TodoItem> => {

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

    return response.json() as Promise<TodoItem>
}

export const getTodos = async (): Promise<AxiosResponse<TodoItem[]>> =>
    axios.get<TodoItem[]>(API_URL);

export const deleteTodos = async (id: string): Promise<AxiosResponse<DeleteTodoResponse>> => axios.delete<DeleteTodoResponse>(API_URL + '/' + id)