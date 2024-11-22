import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        { name: 'Zadanie 1', taskId: 1, status: 'completed' },
        { name: 'Zadanie 2', taskId: 2, status: 'inProgress' }
    ]);

    return <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
