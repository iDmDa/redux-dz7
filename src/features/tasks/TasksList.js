import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./tasksSlice";

const TasksList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const status = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTasks());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    {task.title} {task.completed ? "(Выполнено)" : "(Невыполнено)"}
                </li>
            ))}
        </ul>
    );
};

export default TasksList;