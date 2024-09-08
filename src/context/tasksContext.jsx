import { createContext, useEffect, useReducer, useState } from "react";
import tasksReducer from "../reducer/tasksReducer";

const TasksContext = createContext();
export const TaskProvider = ({ children }) => {
  // const [tasks, dispatch] = useReducer(tasksReducer, [
  //   { id: 0, text: "나의 첫 투두리스트 완료", done: false, color: "pink" },
  // ]);

  const storeTasks = () => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  };
  const [tasks, setTasks] = useState(storeTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
