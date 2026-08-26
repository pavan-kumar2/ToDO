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

exports.getTodoItem = async (req, res) => {
    try {
        const todoItem = await TodoItem.find();
        res.json(todoItem)
    } catch (error) {
        console.error("Error fetching todo items:", error)

        res.status(500).json({
            error: "Unable to fetch todo items"
        })
    }
}


exports.deleteTodo = async (req, res) => {
    try {

        const { id } = req.params

        const todoItem = await TodoItem.findByIdAndDelete(id)


        if (!todoItem) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Todo delete successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateTodo = async (req, res) => {

    try {
        const { completed } = req.body;
        const { id } = req.params;

        const todo = await TodoItem.findByIdAndUpdate(
            id,
            { completed },
            {
                new: true,
                runValidators: true
            }
        )

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

