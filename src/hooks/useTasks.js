// This hook is used to manage the tasks state and the API calls
import { useState, useCallback } from 'react'
import apiCall from '../api'

// Sort tasks so completed tasks are at the bottom
const sortTasks = (tasks) => {
  return tasks.sort((a, b) => {
    if (a.completed === b.completed) {
      return 0
    }
    if (a.completed) {
      return 1
    }
    return -1
  })
}

const useTasks = () => {
  const [tasks, setTasks] = useState([])

  // use useCallback to memoize the function so it doesn't change on every render
  const getTasks = useCallback(async () => {
    const endpoint = '/tasks'

    try {
      const tasks = await apiCall(endpoint, 'GET')
      setTasks(sortTasks(tasks))
    } catch (error) {
      console.error('Error getting tasks:', error)
    }
  }, [])

  const addTask = async (taskTitle) => {
    const endpoint = '/tasks'
    const data = { title: taskTitle, completed: false }

    try {
      await apiCall(endpoint, 'POST', data)
      await getTasks()
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const deleteTask = async (id) => {
    const endpoint = `/tasks/${id}`

    try {
      await apiCall(endpoint, 'DELETE')
      await getTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const updateTask = async (id, completed) => {
    const endpoint = `/tasks/${id}`
    const data = { completed }

    try {
      await apiCall(endpoint, 'PATCH', data)
      await getTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return { tasks, getTasks, addTask, deleteTask, updateTask }
}

export default useTasks
