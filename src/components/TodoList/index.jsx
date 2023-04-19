// This is the main component of the app. It contains the TaskInputForm and TaskList components.
import { useEffect, useState } from 'react'
import useTasks from '../../hooks/useTasks'
import TaskInputForm from '../TaskInputForm'
import TaskList from '../TaskList'
import './index.css'

export default function TodoList() {
  const { tasks, getTasks, addTask, deleteTask, updateTask } = useTasks()
  const [task, setTask] = useState('')

  const onCheckboxChange = (event) => {
    const id = event.target.getAttribute('data-id')
    const completed = event.target.checked
    updateTask(id, completed)
  }

  const handleAddTask = () => {
    // clear the input field
    setTask('')
    addTask(task)
  }

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>
      <TaskInputForm task={task} setTask={setTask} addTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onCheckboxChange={onCheckboxChange}
        deleteTask={deleteTask}
      />
    </div>
  )
}
