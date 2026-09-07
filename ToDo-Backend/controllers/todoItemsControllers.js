const TodoItem = require("../models/Todo");

exports.createTodoItem = async (req, res) => {

    try {
        const { task, date, userId } = req.body

        if (typeof task !== "string" || !task.trim()) {
            return res.status(400).json({
                error: "task is required"
            })
        }

        const todoItem = new TodoItem({ task: task.trim(), date, user: userId })

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
        const { userId } = req.query

        if (userId) {
            const todoItem = await TodoItem.find({ user: userId }).sort({ updatedAt: -1 })
            res.json(todoItem)
        } else {
            res.status(400).json({
                error: "userId is required"
            })
        }

    } catch (error) {
        console.error("Error fetching todo items:", error)

        res.status(500).json({
            error: "Unable to fetch todo items"
        })
    }
}


exports.deleteTodo = async (req, res) => {
    try {

        const { userId } = req.body

        const { id } = req.params

        const todoItem = await TodoItem.findByIdAndDelete({ _id: id, user: userId })


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
        const { completed, userId } = req.body;
        const { id } = req.params;

        const todo = await TodoItem.findByIdAndUpdate(
            { _id: id, user: userId },
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

