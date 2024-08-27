import { React, useContext, useEffect, useRef, useState } from "react";
import AddTask from "./components/addTask";
import TaskList from "./components/taskList";
import TasksContext from "./context/tasksContext";
import { UserNameContext } from "./context/userNameContext";
import styled from "styled-components";
import Weather from "./components/weather";

const labelColors = [
  { id: 0, color: "pink" },
  { id: 1, color: "green" },
  { id: 2, color: "coral" },
  { id: 3, color: "skyblue" },
];

const ToDoList = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [addText, setAddText] = useState("");
  const userName = useContext(UserNameContext);
  // const [nextId, setNextId] = useState(() => {
  //   const storeId = localStorage.getItem("nextId");
  //   return storeId ? parseInt(storeId, 10) : 0;
  // });

  const [dateTime, setDateTime] = useState(new Date());
  const [labelColor, setLabelColor] = useState("pink");
  const [filterColor, setFilterColor] = useState(null);
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    console.log("tasksss", tasks);
  }, [tasks]);
  useEffect(() => {
    const updateDateTime = () => {
      setDateTime(new Date());
    };
    const timer = setInterval(() => {
      const newTime = new Date();
      if (newTime.getMinutes !== dateTime.getMinutes()) {
        updateDateTime();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTime]);
  const handleClickFilter = (color) => {
    const isFiltering = localStorage.getItem("filtering", true);
    const currentFilterColor = localStorage.getItem("filterColor");
    console.log(
      "currentFilterColor:",
      currentFilterColor,
      "color:",
      color.split(" ")[0]
    );
    //필터링
    if (isFiltering && currentFilterColor === color.split(" ")[0]) {
      //같은 색의 필터 컬러를 눌렀어?
      setFiltering(false); //필터링 종료
      localStorage.setItem("filtering", false);
      localStorage.setItem("filterColor", null);
    } else {
      setFiltering(true); //필터링 시작
      localStorage.setItem("filtering", true);
      setFilterColor(color.split(" ")[0]);
      localStorage.setItem("filterColor", color.split(" ")[0]);
    }
  };
  const handleAddTask = (text, color) => {
    const writeDate = new Date();
    setTasks((prev) => [
      ...prev,
      {
        // id: nextId,
        id: writeDate,
        text: text,
        done: false,
        color: color,
      },
    ]);
    setAddText("");
    // const newId = nextId + 1;
    // setNextId(newId);
    // localStorage.setItem("nextId", newId);
  };
  const handleTaskUpdate = (task) => {
    console.log("task 업데이트 하는 중...", task);
    setTasks(
      tasks.map((item) => {
        if (item.id === task.id) {
          return task;
        } else {
          return item;
        }
      })
    );
  };
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const formatDateTime = (date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월
          ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  };

  return (
    <Wrap>
      <Inner>
        <Title>💡{userName}의 할일 목록</Title>
        <Timer>{formatDateTime(dateTime)}</Timer>
        <Weather />
        <Article>
          <Section>
            <SectionTitle>
              <span>✍️새로운 할일 적기</span>
            </SectionTitle>
            <AddTask
              addText={addText}
              setAddText={setAddText}
              onAddText={handleAddTask}
              labelColor={labelColor}
              labelColors={labelColors}
              // onChange={handleChangeValue}
              setLabelColor={setLabelColor}
            />
          </Section>
          <Section>
            <SectionTitle>
              <span>📒할일 리스트</span>
              <div className="filterBox">
                {labelColors.map((item) => {
                  return (
                    <button
                      key={item.id}
                      className={`${item.color} ${
                        filtering && filterColor === item.color
                          ? "filtering"
                          : undefined
                      }`}
                      onClick={(e) => {
                        handleClickFilter(e.target.className);
                      }}
                    ></button>
                  );
                })}
              </div>
            </SectionTitle>
            {tasks.length === 0 ? (
              <EmptyContainer>
                <span style={{ fontSize: 24 }}>💬</span>할 일을 추가해 주세요.
              </EmptyContainer>
            ) : (
              <TaskList
                onChangeTask={handleTaskUpdate}
                onDelete={handleDeleteTask}
                labelColor={labelColor}
                labelColors={labelColors}
                onChangeDone={handleTaskUpdate}
                filterColor={filterColor}
                filtering={filtering}
              />
            )}
          </Section>
        </Article>
      </Inner>
    </Wrap>
  );
};

export default ToDoList;

const EmptyContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  background-color: #f2f2f2;
  margin: 0 20px;
  border-radius: 10px;
`;
const Wrap = styled.div``;

const Inner = styled.div`
  width: 800px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
`;

const Article = styled.article`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionTitle = styled.div`
  display: flex;
  justify-contents: space-between;
  align-items: center;

  span {
    flex: 1;
    font-size: 18px;
    font-weight: bold;
  }
  .filterBox {
    display: flex;
    gap: 5px;

    button {
      width: 20px;
      height: 20px;
    }
    button.filtering {
      border: 2px solid;
    }
    .pink {
      background-color: pink;
    }
    .green {
      background-color: green;
    }
    .skyblue {
      background-color: skyblue;
    }
    .coral {
      background-color: coral;
    }
  }
`;

const Timer = styled.h5`
  font-size: 32px;
  font-weight: 500;
  color: #ffb2de;
`;
