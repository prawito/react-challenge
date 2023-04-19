import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoList from './'
import useTasks from '../../hooks/useTasks'

jest.mock('../../hooks/useTasks')

const mockUseTasks = {
  tasks: [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
  ],
  getTasks: jest.fn(),
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
}

describe('TodoList', () => {
  beforeEach(() => {
    useTasks.mockReturnValue(mockUseTasks)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the component', () => {
    render(<TodoList />)
    expect(screen.getByText('TODO LIST')).toBeInTheDocument()
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  test('handles adding a new task', () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText('Task name'), {
      target: { value: 'New task' },
    })
    fireEvent.click(screen.getByText('Add'))
    expect(mockUseTasks.addTask).toHaveBeenCalledWith('New task')
  })

  test('handles deleting a task', () => {
    render(<TodoList />)
    fireEvent.click(screen.getAllByText('Delete', { selector: 'button' })[0])
    expect(mockUseTasks.deleteTask).toHaveBeenCalledWith(1)
  })

  test('handles updating a task', () => {
    render(<TodoList />)
    fireEvent.click(screen.getByTestId('1-checkbox'))
    expect(mockUseTasks.updateTask).toHaveBeenCalledWith('1', true)
  })
})
