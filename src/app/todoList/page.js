'use client'
import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { PlusCircle, CheckCircle, Circle } from 'lucide-react';

const client = new GraphQLClient('http://127.0.0.1:8000/graphql/');

const GET_TASKS = gql`
  query getTasks {
    tasks {
      completed
      id
      title
    }
  }
`;

const CREATE_TASK = gql`
  mutation createTask($title: String!) {
    createTask(title: $title) {
      task {
        completed
        id
        title
      }
    }
  }
`;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const { tasks } = await client.request(GET_TASKS);
    setTasks(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.request(CREATE_TASK, { title });
      setTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <PlusCircle className="h-5 w-5" />
            Add Task
          </button>
        </div>
      </form>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li 
            key={task.id}
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4"
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;



