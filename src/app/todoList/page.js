'use client'
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS, CREATE_TASK ,UPDATE_TASK } from '../mutations/queries';
import { useState } from 'react';

export default function Home() {
    const { data, loading, error } = useQuery(GET_TASKS);
    const [createTask] = useMutation(CREATE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    });
    // const [updateTask] = useMutation(UPDATE_TASK);
    // const [newTask, setNewTask] = useState('');

    // const handleAddTask = () => {
    //     if (newTask.trim()) {
    //         createTask({ variables: { title: newTask } });
    //         setNewTask('');
    //     }
    // };

    // const handleToggleTask = (id, completed) => {
    //     updateTask({ variables: { id, completed: !completed } });
    // };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>To-Do List</h1>
            {/* <ul>
                {data.tasks.map((task) => (
                    <li key={task.id}>
                        <span
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                            }}
                            onClick={() => handleToggleTask(task.id, task.completed)}
                        >
                            {task.title}
                        </span>
                    </li>
                ))}
            </ul> */}
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New Task"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}
// export default function Home(){
//     return(
//         <div>Home</div>
//     )
// }