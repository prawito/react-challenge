import PropTypes from 'prop-types'
import './index.css'

const TaskList = ({ tasks, onCheckboxChange, deleteTask }) => {
  return (
    <div className="task-list-container">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                data-testid={`${task.id}-checkbox`}
                data-id={task.id}
                checked={task.completed}
                onChange={onCheckboxChange}
              />
              <span className="checkmark"></span>
            </label>
            <span className={task.completed ? 'done' : ''}>{task.title}</span>
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
