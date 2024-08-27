const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case "add": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
          color: action.color,
        },
      ];
    }
    case "update": {
      return tasks.map((item) => {
        if (item.id === action.task.id) {
          return action.task;
        } else {
          return item;
        }
      });
    }
    case "delete": {
      return tasks.filter((item) => item.id !== action.id);
    }
    default: {
      throw Error("Unknown action: ", action.type);
    }
  }
};

export default tasksReducer;
