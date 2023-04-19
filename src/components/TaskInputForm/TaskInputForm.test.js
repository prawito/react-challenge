import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskInputForm from './'

describe('TaskInputForm', () => {
  const mockSetTask = jest.fn()
  const mockAddTask = jest.fn()

  test('renders correctly', () => {
    render(
      <TaskInputForm task="" setTask={mockSetTask} addTask={mockAddTask} />,
    )
    expect(screen.getByPlaceholderText('Task name')).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })

  test('handles form submission', () => {
    render(
      <TaskInputForm
        task="New task"
        setTask={mockSetTask}
        addTask={mockAddTask}
      />,
    )
    fireEvent.submit(screen.getByRole('form', { name: /Task form/i }))
    expect(mockAddTask).toHaveBeenCalledTimes(1)
  })

  test('handles form submission', () => {
    render(
      <TaskInputForm
        task="New task"
        setTask={mockSetTask}
        addTask={mockAddTask}
      />,
    )
    fireEvent.submit(screen.getByRole('form'))
    expect(mockAddTask).toHaveBeenCalledTimes(1)
  })
})
