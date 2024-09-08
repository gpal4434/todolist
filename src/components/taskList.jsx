import { React, useContext } from "react";
import TaskItem from "./taskItem";
import TasksContext from "../context/tasksContext";
import styled from "styled-components";

const TaskList = ({
  onChangeTask,
  onDelete,
  labelColors,
  onChangeDone,
  filterColor,
  filtering,
}) => {
  const { tasks } = useContext(TasksContext);
  const filteredTasks = filtering
    ? tasks.filter((item) => item.color === filterColor)
    : tasks;

  return (
    <List>
      <Ul>
        {filteredTasks &&
          filteredTasks.map((item) => (
            <Li key={item.id}>
              <TaskItem
                task={item}
                onChangeTask={onChangeTask}
                onDelete={onDelete}
                labelColors={labelColors}
                onChangeDone={onChangeDone}
                filterColor={filterColor}
              />
            </Li>
          ))}
      </Ul>
    </List>
  );
};

export default TaskList;

const List = styled.div`
  padding: 10px 20px 20px;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Li = styled.li`
  border-bottom: 1px solid #d9d9d9;
  position: relative;
`;
