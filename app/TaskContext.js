import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext();

const TASK_STORAGE_KEY = '@tasks';

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);


    const loadTasks = async () =>{
        try{
            const storedTasks = await AsyncStorage.getItem(TASK_STORAGE_KEY);
            if(storedTasks){
                setTasks(JSON.parse(storedTasks));
            }
        }catch (error){
            console.error("Błąd ładowania tasków");
        }
    };


    const saveTasks = async(updatedTasks)=>{
        try{
            await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updatedTasks));
        }catch(error){
            console.error("Błąd zapisywania tasków");
        }
    };

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) =>
                task.taskId === taskId ? { ...task, status: newStatus } : task
            );
            saveTasks(updatedTasks);
            return updatedTasks;
        });
    };

    const addTask = (taskName) => {
        setTasks((prevTasks) => {
            const newTask = {
                name: taskName,
                taskId: prevTasks.length + 1,
                status: 'inProgress',
            };
            const updatedTasks = [...prevTasks, newTask];
            saveTasks(updatedTasks);
            return updatedTasks;
        });
    };

    const deleteTask = (taskId) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter((task) => task.taskId !== taskId);
            saveTasks(updatedTasks);
            return updatedTasks;
        });
    };
    

    useEffect(() => {
        loadTasks();
    }, []);


    return (
        <TaskContext.Provider value={{ tasks, setTasks, updateTaskStatus, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
