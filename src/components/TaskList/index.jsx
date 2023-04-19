import PropTypes from 'prop-types'

const TaskList = ({ tasks, onCheckboxChange, deleteTask }) => {
  return (
    <div className="list-container">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              data-id={task.id}
              checked={task.completed}
              onChange={onCheckboxChange}
            />
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}

export default TaskList
