// external module
const express = require('express');
const todoItemRouter = express.Router();

// local module
const todoItemController = require("../controllers/todoItemsControllers.js")

todoItemRouter.post('/', todoItemController.createTodoItem)

module.exports = todoItemRouter;