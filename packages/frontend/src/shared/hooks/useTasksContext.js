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


  const addTask = (task) => {
    setTasks([...tasks, task]);
  }

  const updateTask = (task) => {
    const taskIdx = tasks.findIndex(t => t.ID === task.ID)
    const tasksToUpdate = [...tasks]
    tasksToUpdate[taskIdx] = task;
    setTasks(tasksToUpdate);
  }

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter(t => t.ID !== taskId)
    setTasks(filteredTasks);
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
