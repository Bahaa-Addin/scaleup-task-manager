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
  const { tasks } = useTasksContext();
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

  useEffect(loadUser, [tasks]);

  return {
    userInfo,
    setUserInfo,
    loading,
  };
}
