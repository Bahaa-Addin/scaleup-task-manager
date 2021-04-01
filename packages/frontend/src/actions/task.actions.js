// @ts-check
import {gql} from "@apollo/client";
import {client} from "../shared/context/ApolloContext";

export async function getAllTasks() {
	return client
	.query({
		query: gql`
			query GetAllTask {
				Tasks {
					ID
					TITLE
					STATUS
					ASSIGNEES {
						ID
						NAME
						POSITION
					}
					CREATOR {
						ID
						NAME
						POSITION
					}
				}
			}
		`
	})
	.then(({ data: { Tasks } }) => Tasks);
}

export async function createTask(taskInput) {
	return client
	.mutate({
		mutation: gql`
			mutation CreateTask($taskInput: TaskInput!) {
				CreateTask(taskInput: $taskInput) {
					ID
					TITLE
					STATUS
					ASSIGNEES {
						ID
						NAME
						POSITION
					}
					CREATOR {
						ID
						NAME
						POSITION
					}
				}
			}
		`,
		variables: { taskInput }
	})
	.then(({ data: { CreateTask: createdTask } }) => createdTask);
}

export async function updateTask(taskInput) {
	return client
	.mutate({
		mutation: gql`
			mutation UpdateTask($taskInput: TaskInput!) {
				UpdateTask(taskInput: $taskInput) {
					ID
					TITLE
					STATUS
					ASSIGNEES {
						ID
						NAME
						POSITION
					}
					CREATOR {
						ID
						NAME
						POSITION
					}
				}
			}
		`,
		variables: { taskInput }
	})
	.then(({ data: { UpdateTask: updatedTask} }) => updatedTask);
}

export async function deleteTask(taskId) {
	return client
	.mutate({
		mutation: gql`
			mutation DeleteTask($taskId: ID!) {
				DeleteTask(taskId: $taskId)
			}
		`,
		variables: { taskId }
	})
	.then(({ data: { DeleteTask: taskId } }) => taskId);
}
