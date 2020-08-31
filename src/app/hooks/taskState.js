import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext";

const taskState = () => {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const getTasks = async () => {
      try {
        const newTasks = await axios.get("/tasks/", {
          headers: { "x-auth-token": userData.token },
        });
        setTasks(newTasks.data);
        setLoadingTasks(false);
      } catch (err) {
        setError(err.message);
      }
    };
    if (userData.user) {
      getTasks();
    } else {
      setTasks([]);
    }
  }, [userData]);

  return { tasks, setTasks, loadingTasks, error };
};

export default taskState;
