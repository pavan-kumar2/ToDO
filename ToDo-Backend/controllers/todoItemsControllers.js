const TodoItem = require("../models/Todo");

exports.createTodoItem = async (req, res) => {

    try {
        const { task, date } = req.body

        if (typeof task !== "string" || !task.trim()) {
            return res.status(400).json({
                error: "task is required"
            })
        }

        const todoItem = new TodoItem({ task: task.trim(), date })

        await todoItem.save();

        res.status(201).json(todoItem)
    } catch (error) {
        console.error("Error creating todo item:", error)
        res.status(500).json({
            error: "Unable to create todo item"
        })
    }

}