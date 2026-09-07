import axios, { type AxiosResponse } from "axios";

const AUTH_URL = "http://localhost:3000/auth";

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

interface updateTodoResponse {
    data: TodoItem,
    message: string,
    success: boolean
}

export interface SignUpRequest {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export const createTodo = async (requestBody: CreateTodoRequest): Promise<TodoItem> => {

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...requestBody, userId: JSON.parse(localStorage.getItem("userId") || "") })
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create todo')
    }

    return response.json() as Promise<TodoItem>
}

export const getTodos = async (): Promise<AxiosResponse<TodoItem[]>> => {
    const userId = JSON.parse(localStorage.getItem("userId") || "")
    return axios.get<TodoItem[]>(`${API_URL}?userId=${userId}`);
}

export const deleteTodos = async (id: string): Promise<AxiosResponse<DeleteTodoResponse>> => {
    const userId = JSON.parse(localStorage.getItem("userId") || "")
    return axios.delete<DeleteTodoResponse>(`${API_URL}/${id}`, { data: { userId } });
}

export const updateTodo = async (id: string, body: { completed: boolean }): Promise<AxiosResponse<updateTodoResponse>> => {
    const userId = JSON.parse(localStorage.getItem("userId") || "")
    return axios.patch<updateTodoResponse>(`${API_URL}/${id}`, { ...body, userId });
}

export const signUpUser = async (body: SignUpRequest): Promise<AxiosResponse<any>> => axios.post<any>(`${AUTH_URL}/signup`, body)

export const signInUser = async (body: SignUpRequest): Promise<AxiosResponse<any>> => axios.post<any>(`${AUTH_URL}/signin`, body)