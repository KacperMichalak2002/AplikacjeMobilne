import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext();

const API_URL = 'http://192.168.0.20:3000/tasks';

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error('Błąd ładowania tasków z serwera', error);
        }
    };

    const addTask = async taskName => {
        try {
            const newTask = {
                title: taskName,
                description: '',
                status: 'In Progress',
                dueDate: new Date().toISOString().split('T')[0],
                imageUri:"",
                urgency:"Normal",
            };
            const response = await axios.post(API_URL, newTask);
            setTasks(prevTasks => [...prevTasks, response.data]);
        } catch (error) {
            console.error('Błąd dodawania taska', error);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
            if (taskToUpdate) {
                const updatedTask = { ...taskToUpdate, status: newStatus };
                await axios.put(`${API_URL}/${taskId}`, updatedTask);
                setTasks(prevTasks =>
                    prevTasks.map(task => (task.id === taskId ? updatedTask : task))
                );
            }
        } catch (error) {
            console.error('Błąd aktualizacji statusu', error);
        }
    };

    const updateUrgency = async (taskId, newUrgency) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
            if (taskToUpdate) {
                const updatedTask = { ...taskToUpdate, urgency: newUrgency };
                await axios.put(`${API_URL}/${taskId}`, updatedTask);
                setTasks(prevTasks =>
                    prevTasks.map(task => (task.id === taskId ? updatedTask : task))
                );
            }
        } catch (error) {
            console.error('Błąd aktualizacji statusu', error);
        }
    };

    const updateImage = async (taskId, newImageUri) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
            if (taskToUpdate) {
                const updatedTask = { ...taskToUpdate, imageUri: newImageUri };
                await axios.put(`${API_URL}/${taskId}`, updatedTask);
                setTasks(prevTasks =>
                    prevTasks.map(task => (task.id === taskId ? updatedTask : task))
                );
            }
        } catch (error) {
            console.error('Błąd aktualizacji zdjęcia', error);
        }
    };

    const deleteTask = async taskId => {
        try {
            await axios.delete(`${API_URL}/${taskId}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Błąd usuwania taska', error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask, updateImage, updateUrgency }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
