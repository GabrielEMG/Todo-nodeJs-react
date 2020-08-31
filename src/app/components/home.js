import React, { useContext, useState, useRef } from "react";
import taskState from "../hooks/taskState";
import { UserContext } from "../hooks/userContext";
import axios from "axios";

const Home = () => {
  const { tasks, setTasks, loadingTasks, error } = taskState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userData } = useContext(UserContext);

  const titleRef = useRef();
  const descriptionRef = useRef();

  const submitTask = async () => {
    const res = await axios.post(
      "/tasks/",
      { title, description },
      { headers: { "x-auth-token": userData.token } }
    );
    if (res.status === 201) {
      setTasks([...tasks, res.data]);
    }
  };

  const completeTask = async (id) => {
    try {
      const res = await axios.put(`/tasks/${id}`, null, {
        headers: { "x-auth-token": userData.token },
      });

      const newTasks = tasks.map((task) => {
        if (task._id === id) {
          return res.data;
        } else {
          return task;
        }
      });
      setTasks(newTasks);
    } catch (err) {}
  };

  const deleteTask = async (id) => {
    const res = await axios.delete(`/tasks/${id}`, {
      headers: { "x-auth-token": userData.token },
    });
    if (res.status === 204) {
      const newTasks = tasks.filter((task) => task._id != id);
      setTasks(newTasks);
    }
  };

  const taskList = tasks.map((task, id) => (
    <div
      onClick={() => completeTask(task._id)}
      key={id}
      className={
        "flex border rounded mb-2 border-dark " +
        (task.completed ? "bg-success" : "bg-warning")
      }
    >
      <div className="row justify-content-end">
        <button
          className="btn btn-danger border-dark"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task._id);
          }}
        >
          x
        </button>
      </div>
      <h4 className="row justify-content-center">{task.title}</h4>
      <p className="row justify-content-center">{task.description}</p>
    </div>
  ));

  return (
    <div className="row justify-content-center">
      <div className="border border-dark rounded p-1">
        <h4 className="text-center">Add a task</h4>
        <input
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          ref={titleRef}
        />
        <textarea
          className="form-control mt-1 mb-1"
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"
          ref={descriptionRef}
        />
        <button className="col-12 btn btn-success" onClick={() => submitTask()}>
          Submit task
        </button>
      </div>
      <div className="flex col-12 mt-3">{taskList}</div>
    </div>
  );
};

export default Home;
