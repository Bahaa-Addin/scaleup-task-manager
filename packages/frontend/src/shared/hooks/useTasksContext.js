import React, {useEffect, useState, useContext} from 'react';
import {getAllTasks} from "../../actions/task.actions";
import {TasksContext} from "../context/TasksContext";

export default function useTasksContext() {
  return useContext(TasksContext)
}

export function useProvideTasks(init = []) {
  const [ tasks, setTasks ] = useState(init);
  const [ loading, setLoading ] = useState(false);

  const loadTasks = () => {
    setLoading(true);
    getAllTasks()
      .then(allTasks => {
        setTasks(allTasks);
        setLoading(false);
      })
  };
  useEffect(loadTasks, [])


  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    return newTask;
  }

  const updateTask = (updatedTask) => {
    const taskIdx = tasks.findIndex(task => task.ID === updatedTask.ID)
    const tasksToUpdate = [...tasks]
    tasksToUpdate[taskIdx] = updatedTask;
    setTasks(tasksToUpdate);
    return updatedTask;
  }

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter(task => task.ID !== taskId)
    setTasks(filteredTasks);
    return taskId;
  }

  return {
    tasks,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    loading,
  };
}
