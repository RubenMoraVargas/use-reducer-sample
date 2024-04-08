import { useReducer } from "react";
import reducer, { initialState } from "./reducer";
import { Task } from "./types";

export function useTaskList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTask = () => {
    console.log("handleAddTask");
    
    const task: Task = {
      id: state.tasks.length + 1,
      title: `Task ${state.tasks.length + 1}`,
    };
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const handleEditTask = (task: Task) => {
    dispatch({ type: "EDIT_TASK", payload: task });
  };

  const handleDeleteTask = (id: number) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const handleSetFilter = (filter: string) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  return {
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleSetFilter,
    ...state,
  };
}
