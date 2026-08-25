import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import CreateTodo from "./components/CreateTodo";
import { BrowserRouter, Route, Routes } from "react-router";
import TodoList from "./components/TodoList";
import Navigation from "./components/Navigation";



createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/create" element={<CreateTodo />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);