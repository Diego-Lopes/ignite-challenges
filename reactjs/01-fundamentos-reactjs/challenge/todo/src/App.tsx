import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { ListTask } from "./components/ListTask";
import { Task } from "./components/Task";
import "./global.css";

interface ITaskProps {
  checked: boolean;
  taskName: string;
}

function App() {
  const [task, setTask] = useState("");
  const [listTasks, setListTasks] = useState<ITaskProps[]>([]);
  const [countCheckeds, setCountCheckeds] = useState(0);

  function handleCreateTask(name: string) {
    if (name !== "") {
      const objTask = { checked: false, taskName: name };
      setListTasks([...listTasks, objTask]);
      setTask("");
    }
    alert("Atenção!, o Campo tem que ser preenchido");
  }

  function handleCheked(name: string) {
    listTasks.map((task) => {
      if (task.taskName === name) {
        if (task.checked === false) {
          task.checked = true;
        } else {
          task.checked = false;
        }
      }
      return task;
    });
  }

  useEffect(() => {
    const listTasksCheckeds = listTasks.filter(
      (item: ITaskProps) => item.checked === true
    );
    setCountCheckeds(listTasksCheckeds.length);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <Task />
          <ListTask />
        </main>
      </div>
    </>
  );
}

export default App;
