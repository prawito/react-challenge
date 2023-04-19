import PropTypes from 'prop-types'
import './index.css'

const TaskInputForm = ({ task, setTask, addTask }) => {
  const handleAddTask = (event) => {
    // Prevent the default behavior of the form (submitting the form)
    event.preventDefault()
    addTask()
  }
  return (
    <div className="task-input-container">
      <form onSubmit={handleAddTask} aria-label="Task form">
        <label htmlFor="task-input" className="visually-hidden">
          Task name
        </label>
        <input
          type="text"
          id="task-input"
          placeholder="Task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

TaskInputForm.propTypes = {
  task: PropTypes.string.isRequired,
  setTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
}

export default TaskInputForm
