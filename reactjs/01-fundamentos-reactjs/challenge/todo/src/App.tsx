import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { ListTask } from "./components/ListTask";
import { Task } from "./components/Task";
import "./global.css";

export interface IAppProps {
  checked: boolean;
  taskName: string;
}

function App() {
  const [task, setTask] = useState("");
  const [listTasks, setListTasks] = useState<IAppProps[]>([]);
  const [countCheckeds, setCountCheckeds] = useState(0);

  function handleCreateTask() {
    if (task !== "") {
      const objTask = { checked: false, taskName: task };
      setListTasks([objTask, ...listTasks]);
      setTask("");
    } else {
      alert("Atenção!, o Campo tem que ser preenchido");
    }
  }

  function handleCheked(name: string) {
    const newList = listTasks.map((task) => {
      if (task.taskName === name) {
        if (task.checked === false) {
          task.checked = true;
        } else {
          task.checked = false;
        }
      }
      return task;
    });

    setListTasks(newList);
  }

  function handleDeleteTask(name: string) {
    const newList = listTasks.filter(
      (item: IAppProps) => name !== item.taskName
    );

    setListTasks(newList);
  }

  useEffect(() => {
    const listTasksCheckeds = listTasks.filter(
      (item: IAppProps) => item.checked === true
    );
    setCountCheckeds(listTasksCheckeds.length);
  }, [listTasks]);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <Task
            task={task}
            setTask={setTask}
            onHandleCreateTask={handleCreateTask}
          />
          <ListTask
            data={listTasks}
            countCheckeds={countCheckeds}
            onHandleCheckedsChange={handleCheked}
            onHandleDeleteTask={handleDeleteTask}
          />
        </main>
      </div>
    </>
  );
}

export default App;
