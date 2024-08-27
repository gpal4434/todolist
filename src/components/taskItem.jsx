import { React, useEffect, useState } from "react";
import styled from "styled-components";

const TaskItem = ({
  task,
  onChangeTask,
  onDelete,
  labelColors,
  onChangeDone,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [done, setDone] = useState(false);

  const elapsedText = (date) => {
    // console.log("date", date);
    const sec = 1;
    const min = sec * 60;
    const hour = min * 60;
    const day = hour * 24;
    const today = new Date();
    const then = new Date(date);

    let elapsedTime = Math.trunc((today.getTime() - then.getTime()) / 1000);

    if (elapsedTime < min) {
      return "방금 전";
    } else if (elapsedTime < hour) {
      return `${Math.trunc(elapsedTime / min)}분 전`;
    } else if (elapsedTime < day) {
      return `${Math.trunc(elapsedTime / hour)}시간 전`;
    } else if (elapsedTime < day * 15) {
      return `${Math.trunc(elapsedTime / day)}일 전`;
    } else {
      return `${then.getFullYear()}`;
    }
  };

  let taskContent = "";
  if (isEditing) {
    taskContent = (
      <>
        <select
          value={task.color}
          onChange={(e) => onChangeTask({ ...task, color: e.target.value })}
        >
          {labelColors.map((item) => (
            <option key={item.id} value={item.color} defaultValue={task.color}>
              {item.color}
            </option>
          ))}
        </select>
        <Input
          type="text"
          value={task.text}
          onChange={(e) => onChangeTask({ ...task, text: e.target.value })}
        />
        <Button onClick={() => setIsEditing(false)}>✅Save</Button>
      </>
    );
  } else {
    taskContent = (
      <>
        <CheckBox
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            onChangeDone({ ...task, done: e.target.checked });
            setDone(e.target.checked);
            console.log("done", e.target.checked);
          }}
        />
        <Text checked={task.done}>{task.text}</Text>
        <span>{elapsedText(task.id)}</span>
        <Button onClick={() => setIsEditing(true)}>✏️Edit</Button>
      </>
    );
  }
  return (
    <Label $labelColor={task.color}>
      {taskContent}
      <Button onClick={() => onDelete(task.id)}>🗑️Delete</Button>
    </Label>
  );
};

export default TaskItem;

const Input = styled.input`
  border: 1px solid pink;
  border-radius: 5px;
  padding: 10px 20px;
  flex: 1;
`;

const Label = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 10px 10px 20px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: ${(props) => props.$labelColor};
  }
`;

const CheckBox = styled.input`
  width: 16px;
  height: 16px;
`;
const Text = styled.span`
  flex: 1;
  font-size: 16px;
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  color: ${(props) => (props.checked ? "#999" : undefined)};
`;

const Button = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 5px 15px;
  width: 90px;
`;
