const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

let tasks = [];

app.get("/api/tasks", (req, res) => {
    res.json({ tasks });
});

app.post("/api/tasks", (req, res) => {
    const { taskName } = req.body;
    tasks.push({ taskName, completed: false });
    res.json({ tasks });
});

app.put("/api/tasks/:index", (req, res) => {
    const index = req.params.index;
    tasks[index].completed = true;
    res.json({ tasks });
});

app.delete("/api/tasks/:index", (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.json({ tasks });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
app.use(express.static("public"));
