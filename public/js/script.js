$(document).ready(function() {
    $("#addTaskBtn").click(function() {
        const taskName = $("#taskInput").val();
        if (taskName) {
            $.post("/api/tasks", { taskName })
            .done(function(data) {
                renderTasks(data.tasks);
            });
        }
    });

    function renderTasks(tasks) {
        const taskList = $("#taskList");
        taskList.empty();
        tasks.forEach(function(task) {
            const listItem = $("<li>")
                .text(task.taskName)
                .append("<button class='completeBtn'>Completar</button>")
                .append("<button class='deleteBtn'>Eliminar</button>");
            if (task.completed) {
                listItem.css("text-decoration", "line-through");
            }
            taskList.append(listItem);
        });
    }

    $("#taskList").on("click", ".completeBtn", function() {
        const index = $(this).parent().index();
        $.ajax({
            url: `/api/tasks/${index}`,
            type: "PUT"
        })
        .done(function(data) {
            renderTasks(data.tasks);
        });
    });

    $("#taskList").on("click", ".deleteBtn", function() {
        const index = $(this).parent().index();
        $.ajax({
            url: `/api/tasks/${index}`,
            type: "DELETE"
        })
        .done(function(data) {
            renderTasks(data.tasks);
        });
    });

    // Cargar tareas al cargar la página
    $.get("/api/tasks")
    .done(function(data) {
        renderTasks(data.tasks);
    });
});
