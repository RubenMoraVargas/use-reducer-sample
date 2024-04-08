import { Action, Task } from "./types";

interface State {
  tasks: Task[];
  filter: string;
}

export const initialState: State = {
  tasks: [],
  filter: "",
};

export const reducer = (state: State, action: Action): State => {
  const handlers: Record<string, (state: State, action: Action) => State> = {
    
    ADD_TASK: (state, action) => ({
      ...state,
      tasks: [...state.tasks, action.payload as Task],
    }),
    EDIT_TASK: (state, action) => {
      const payload = action.payload as Task;
      return {
        ...state,
        tasks: state.tasks.map((task: Task) => (task.id === payload.id ? payload : task)),
      };
    },
    DELETE_TASK: (state, action) => ({
      ...state,
      tasks: state.tasks.filter((task: Task) => task.id !== action.payload),
    }),
    SET_FILTER: (state, action) => ({
      ...state,
      filter: action.payload as string,
    }),
  };
console.log(action.type, state, action);

  return handlers[action.type] ? handlers[action.type](state, action) : state;
};



export default reducer;
