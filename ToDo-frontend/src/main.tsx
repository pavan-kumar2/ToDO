import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import CreateTodo from "./components/CreateTodo";
import { BrowserRouter, Route, Routes } from "react-router";
import TodoList from "./components/TodoList";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";



createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/create" element={<CreateTodo />} />
                <Route path="/signup" element={<SignUp />} />
                {/* <Route path="/signin" element={<div>Sign In</div>} /> */}
            </Routes>
        </BrowserRouter>
    </StrictMode>
);