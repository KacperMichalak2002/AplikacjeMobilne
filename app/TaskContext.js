import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        { name: 'Zadanie 1', taskId: 1, status: 'completed' },
        { name: 'Zadanie 2', taskId: 2, status: 'inProgress' }
    ]);

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.taskId === taskId ? { ...task, status: newStatus } : task
            )
        );
    };


    return <TaskContext.Provider value={{ tasks, setTasks, updateTaskStatus }}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
