// external module
const express = require('express');
const todoItemRouter = express.Router();

// local module
const todoItemController = require("../controllers/todoItemsControllers.js")

todoItemRouter.post('/', todoItemController.createTodoItem)
todoItemRouter.get('/', todoItemController.getTodoItem)
todoItemRouter.delete('/:id', todoItemController.deleteTodo)

module.exports = todoItemRouter;