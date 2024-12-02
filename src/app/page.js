'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GraphQLClient } from 'graphql-request';
import { PlusCircle, CheckCircle, Circle, Trash2, Loader2 } from 'lucide-react';
import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './mutations/queries';

const getClient = () => new GraphQLClient('http://127.0.0.1:8000/graphql/');

const TaskList = () => {
  const [mounted, setMounted] = useState(false);  
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingTasks, setProcessingTasks] = useState(new Set());

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const { tasks } = await getClient().request(GET_TASKS);
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchTasks();
  }, [fetchTasks]);

  if (!mounted) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await getClient().request(CREATE_TASK, { title });
      setTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTask = async (id, completed) => {
    setProcessingTasks((prev) => new Set(prev).add(id));
    try {
      await getClient().request(UPDATE_TASK, { id, completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setProcessingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const deleteTask = async (e, id) => {
    e.stopPropagation();
    setProcessingTasks((prev) => new Set(prev).add(id));
    try {
      const { deleteTask: { success } } = await getClient().request(DELETE_TASK, { id });
      if (success) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setProcessingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Task Manager</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add new task..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <PlusCircle className="h-5 w-5" />
              )}
              Add Task
            </button>
          </div>
        </form>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No tasks yet. Add one above!</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => {
              const isProcessing = processingTasks.has(task.id);
              return (
                <li 
                  key={task.id}
                  className={`flex items-center gap-3 rounded-lg border border-gray-200 p-4 cursor-pointer group hover:bg-gray-50 transition-colors ${
                    isProcessing ? 'opacity-50' : ''
                  }`}
                  onClick={() => !isProcessing && toggleTask(task.id, task.completed)}
                >
                  {isProcessing ? (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  ) : task.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </span>
                  <button
                    onClick={(e) => !isProcessing && deleteTask(e, task.id)}
                    disabled={isProcessing}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 focus:outline-none transition-opacity disabled:opacity-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;