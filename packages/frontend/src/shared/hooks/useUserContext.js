import React, {useEffect, useState, useContext} from 'react';
import {getUserInfo} from "../../actions/user.actions";
import useAuthContext from "./useAuthContext";
import {UserContext} from "../context/UserContext";
import useTasksContext from "./useTasksContext";

export default function useUserContext() {
   return useContext(UserContext);
}

export function useProvideUser(init = null) {
  const auth = useAuthContext()
  // const { tasks } = useTasksContext();
  const [ userInfo, setUserInfo ] = useState(init);
  const [ loading, setLoading ] = useState(false);

  const loadUser = () => {
    setLoading(true);
    getUserInfo(auth.currentUser.uid)
      .then(user => {
        setUserInfo(user);
        setLoading(false);
      })
  };

  useEffect(loadUser, []);

  const assignTask = (newTask) => {
    if (newTask.ASSIGNEES.some(user => user.ID === userInfo.ID)) {
      const { ASSIGNED_TASKS = [] } = userInfo;
      const updatedUserInfo = { ...userInfo, ASSIGNED_TASKS: [...ASSIGNED_TASKS, newTask]};
      setUserInfo(updatedUserInfo);
    }
    return newTask;
  };

  const updateAssignedTask = (updatedTask) => {
    if (userInfo.ASSIGNED_TASKS.some(task => task.ID === updatedTask.ID)) {
      const taskIdx = userInfo.ASSIGNED_TASKS.findIndex(t => t.ID === updatedTask.ID);
      const tasksToUpdate = [...userInfo.ASSIGNED_TASKS]
      tasksToUpdate[taskIdx] = updatedTask;
      const updatedUserInfo = { ...userInfo, ASSIGNED_TASKS: tasksToUpdate};
      setUserInfo(updatedUserInfo);
    }
    return updatedTask;
  }

  const deleteAssignedTask = (taskId) => {
    if (userInfo.ASSIGNED_TASKS.some(task => task.ID === taskId)) {
      const filteredTasks = userInfo.ASSIGNED_TASKS.filter(task => task.ID !== taskId);
      const updatedUserInfo = { ...userInfo, ASSIGNED_TASKS: filteredTasks };
      setUserInfo(updatedUserInfo);
    }
    return taskId;
  }

  return {
    userInfo,
    setUserInfo,
    assignTask,
    updateAssignedTask,
    deleteAssignedTask,
    loading,
  };
}
