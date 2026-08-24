import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import CreateTodo from "./components/CreateTodo";

createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <CreateTodo />
    </StrictMode>
);