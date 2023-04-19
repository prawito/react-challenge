import PropTypes from 'prop-types'

const TaskInputForm = ({ task, setTask, addTask }) => {
  const handleAddTask = (event) => {
    // Prevent the default behavior of the form (submitting the form)
    event.preventDefault()
    addTask()
  }
  return (
    <div className="input-container">
      <form onSubmit={handleAddTask}>
        <input
          type="text"
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
