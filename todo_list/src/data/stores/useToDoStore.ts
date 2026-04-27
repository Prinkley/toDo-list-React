import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { generateId } from '../helpers';

interface Task {
    id: string;
    title: string;
    createdAt: number;
    completed: boolean;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id:string, title: string) => void;
    toggleTask: (id: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>()(
    devtools(
        persist((set,get) => ({
                tasks: [],
                createTask: (title) => {
                    const { tasks } = get();
                    const newTask = {
                        id: generateId(),
                        title,
                        createdAt: Date.now(),
                        completed: false,
                    }
                    set({
                        tasks: [newTask].concat(tasks),
                    })
                },
                updateTask: (id: string, title: string) => {
                    const { tasks } = get();
                    set({
                        tasks: tasks.map((task) => ({
                            ...task,
                            title: task.id === id ? title: task.title,
                        }))
                    })
                },
                toggleTask: (id: string) => {
                    const { tasks } = get();
                    set({
                        tasks: tasks.map((task) => ({
                            ...task,
                            completed: task.id === id ? !task.completed : task.completed,
                        }))
                    })
                },
                removeTask: (id: string) => {
                    const { tasks } = get();
                    set({ tasks: tasks.filter((task) => task.id !== id )})
                },
            }),
            { 
                name: 'todo-storage',
                storage: createJSONStorage(() => localStorage),
            }
        ),
        { name: 'ToDoStore' }
    )
);
