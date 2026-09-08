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
        credentials: 'include',
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

export const getTodos = async (): Promise<AxiosResponse<TodoItem[]>> => {
    return axios.get<TodoItem[]>(API_URL, { withCredentials: true });
}

export const deleteTodos = async (id: string): Promise<AxiosResponse<DeleteTodoResponse>> => {
    return axios.delete<DeleteTodoResponse>(`${API_URL}/${id}`, { withCredentials: true });
}

export const updateTodo = async (id: string, body: { completed: boolean }): Promise<AxiosResponse<updateTodoResponse>> => {
    return axios.patch<updateTodoResponse>(`${API_URL}/${id}`, body, { withCredentials: true });
}

export const signUpUser = async (body: SignUpRequest): Promise<AxiosResponse<any>> => axios.post<any>(`${AUTH_URL}/signup`, body)

export const signInUser = async (body: SignUpRequest): Promise<AxiosResponse<any>> => axios.post<any>(`${AUTH_URL}/signin`, body, { withCredentials: true })

export const signOutUser = async (): Promise<AxiosResponse<any>> => axios.post<any>(`${AUTH_URL}/signout`, {}, { withCredentials: true })