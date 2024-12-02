// import { gql } from '@apollo/client';
import {gql} from 'graphql-request' 

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
export const DELETE_TASK = gql`
mutation deleteTask($id: ID!) {
  deleteTask(id: $id) {
    success
  }
}
`;
