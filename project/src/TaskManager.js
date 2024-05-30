import React, { useState, useEffect } from "react"

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [newTask, setNewTask] = useState({ title: "", description: "" })
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.title.trim() === "") return
    setTasks([...tasks, { ...newTask, completed: false, id: Date.now() }])
    setNewTask({ title: "", description: "" })
  }

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "active") return !task.completed
    return true
  })

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Task Manager</h1>
      <div className='mb-4'>
        <input
          className='border rounded p-2 mr-2 w-full'
          type='text'
          placeholder='Task Title'
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          className='border rounded p-2 mr-2 w-full mt-2'
          placeholder='Task Description'
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded mt-2'
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className='mb-4'>
        <button
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </button>
        <button
          className={`px-4 py-2 rounded ml-2 ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("active")}
        >
          Active Tasks
        </button>
        <button
          className={`px-4 py-2 rounded ml-2 ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed Tasks
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 mb-2 border rounded ${
              task.completed ? "bg-green-200" : ""
            }`}
          >
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-xl font-bold'>{task.title}</h2>
                <p>{task.description}</p>
              </div>
              <div>
                <button
                  className='bg-yellow-500 text-white px-2 py-1 rounded mr-2'
                  onClick={() =>
                    editTask(task.id, {
                      ...task,
                      title: prompt("Edit Title:", task.title) || task.title,
                      description:
                        prompt("Edit Description:", task.description) ||
                        task.description,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded mr-2'
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
                <button
                  className='bg-green-500 text-white px-2 py-1 rounded'
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.completed ? "Mark as Active" : "Mark as Completed"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskManager
