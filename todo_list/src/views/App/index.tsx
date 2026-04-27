import React from "react";

import { useToDoStore } from "../../data/stores/useToDoStore";
import { useShallow } from "zustand/react/shallow";
import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/InputTask";

import styles from "./index.module.scss";

export const App: React.FC = () => {
  const [
    tasks, 
    createTask, 
    updateTask, 
    removeTask,
    toggleTask
] = useToDoStore(
    useShallow((state) => [
      state.tasks,
      state.createTask,
      state.updateTask,
      state.removeTask,
      state.toggleTask,
    ]),
  );


  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputPlus 
            onAdd={(title) => {
                if (title) {
                    createTask(title)
                }
            }}
        />
      </section>

      <section className={styles.articleSection}>
            {!tasks.filter(t => !t.completed).length && (
                <p className={styles.articleText}>There is no tasks.</p>
            )}
            {tasks.filter(t => !t.completed).map((task) => (
                <InputTask
                    key={task.id}
                    id={task.id} 
                    title={task.title}  
                    completed={task.completed}
                    onDone={toggleTask}
                    onEdited={updateTask}
                    onRemoved={removeTask}
                />
            ))}
      </section>

      <section className={styles.articleSection}>
            {!tasks.filter(t => t.completed).length && (
                <p className={styles.articleText}>No completed tasks yet.</p>
            )}
            {tasks.filter(t => t.completed).map((task) => (
                <InputTask
                    key={task.id}
                    id={task.id} 
                    title={task.title}  
                    completed={task.completed}
                    onDone={toggleTask}
                    onEdited={updateTask}
                    onRemoved={removeTask}
                />
            ))}
      </section>
    </article>
  );
};
