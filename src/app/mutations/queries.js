import { gql } from '@apollo/client';

export const GET_TASKS = gql`
    query GetTasks {
        tasks {
            id
            title
            completed
        }
    }
`;

export const CREATE_TASK = gql`
    mutation CreateTask($title: String!) {
        createTask(title: $title) {
            task {
                id
                title
                completed
            }
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $completed: Boolean!) {
        updateTask(id: $id, completed: $completed) {
            task {
                id
                title
                completed
            }
        }
    }
`;
