import { TaskProvider } from "./context/tasksContext";
import { UserNameContext } from "./context/userNameContext.jsx";
import ToDoList from "./ToDoList";

function App() {
  return (
    <UserNameContext.Provider value={"렛츠기릿"}>
      <TaskProvider>
        <ToDoList />
      </TaskProvider>
    </UserNameContext.Provider>
  );
}

export default App;
