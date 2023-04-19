import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskList from './'

const tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
]

describe('TaskList', () => {
  const mockOnCheckboxChange = jest.fn()
  const mockDeleteTask = jest.fn()

  test('renders tasks correctly', () => {
    render(
      <TaskList
        tasks={tasks}
        onCheckboxChange={mockOnCheckboxChange}
        deleteTask={mockDeleteTask}
      />,
    )
    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument()
    })
  })

  test('handles checkbox change', () => {
    render(
      <TaskList
        tasks={tasks}
        onCheckboxChange={mockOnCheckboxChange}
        deleteTask={mockDeleteTask}
      />,
    )
    fireEvent.click(screen.getByTestId('1-checkbox'))
    expect(mockOnCheckboxChange).toHaveBeenCalledTimes(1)
  })

  test('handles delete button click', () => {
    render(
      <TaskList
        tasks={tasks}
        onCheckboxChange={mockOnCheckboxChange}
        deleteTask={mockDeleteTask}
      />,
    )
    const deleteButtons = screen.getAllByText('Delete', { selector: 'button' })
    fireEvent.click(deleteButtons[0])
    expect(mockDeleteTask).toHaveBeenCalledTimes(1)
    expect(mockDeleteTask).toHaveBeenCalledWith(tasks[0].id)
  })
})
