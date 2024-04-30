import express from 'express';
import bodyParser from 'body-parser'

const app = express()

const PORT = 5111

app.use(bodyParser.json())

const todos = [
    {
        id: "1",
        title: "Todo 1",
        isCompleted: false
    },
    {
        id: "2",
        title: "Todo 2",
        isCompleted: true
    }
]


app.all('/', (req, res) => {
    res.send("I am up")
})

// CREATE
app.post("/todos", (req, res) => {
    const newTodo = req.body
    todos.push(newTodo)
    res.status(201).json({
        message: "New Todo Added"
    })
})

// READ
app.get("/todos", (req, res) => {
    res.send(todos)
})

// UPDATE
app.put("/todos/:id", (req, res) => {
    const updatedTodo = req.body
    const todoIndex = todos.findIndex(todo => todo.id === updatedTodo.id)

    if (todoIndex !== -1) {
        todos[todoIndex] = {
            id: req.params.id,
            ...updatedTodo
        }
        res.json({
            message: 'Todo Updated Succesfully'
        })
    } else {
        res.status(404).json({
            message: 'Todo Id is not present'
        })
    }


})



// DELETE
app.delete("/todos/:id", (req, res) => {
    const deletedTodoId = req.params.id
    const todoIndex = todos.findIndex(todo => todo.id === deletedTodoId)

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1)
    }

    res.json({
        message: 'Todo Deleted Succesfully'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})