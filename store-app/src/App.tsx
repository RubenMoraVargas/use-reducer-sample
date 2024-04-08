import { useState } from "react";
import { useTaskList } from "./useTaskList";

export const App: React.FC = () => {
  const {
    handleSetFilter,
    handleEditTask,
    handleDeleteTask,
    handleAddTask,
    filter,
    tasks,
  } = useTaskList();

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTaskValue, setEditTaskValue] = useState<string>("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTaskValue(event.target.value);
  };

  const handleSubmitEdit = () => {
    if (editingTaskId !== null) {
      handleEditTask({ id: editingTaskId, title: editTaskValue });
      setEditingTaskId(null);
      setEditTaskValue("");
    }
  };

  return (
    <div>
      Filtro: <input type="text" value={filter} onChange={(e) => handleSetFilter(e.target.value)} />
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editTaskValue}
                onChange={handleEditInputChange}
                onBlur={handleSubmitEdit}
              />
            ) : (
              task.title
            )}
            <button onClick={() => setEditingTaskId(task.id)}>Editar/Guardar</button>
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddTask}>Agregar tarea</button>
    </div>
  );
};

export default App;
