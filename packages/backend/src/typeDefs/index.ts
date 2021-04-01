const { gql } = require('apollo-server-express');

export default gql`
	type User {
		ID: ID!
		NAME: String!
		EMAIL: String!
		POSITION: String
		CREATED_TASKS: [Task]
		ASSIGNED_TASKS: [Task]
	}
	input UserInput {
		ID: ID
		NAME: String
		EMAIL: String
		POSITION: String
	}
	input TaskInput {
		ID: ID
		TITLE: String
		CREATOR_ID: ID
		ASSIGNEES_IDS: [ID!]
		STATUS: String
	}
	type Task {
		ID: ID!
		TITLE: String!
		CREATOR: User!
		ASSIGNEES: [User!]!
		STATUS: String
	}
	type Query {
		Tasks: [Task]
		Users: [User]
		User(id: String!): User
		SearchUsersByName(searchTerm: String!): [User]
	}
	type Mutation {
		CreateUser(userInput: UserInput!): User!
		UpdateUser(userInput: UserInput!): User!
		DeleteUser(userId: ID!): ID!
		CreateTask(taskInput: TaskInput!): Task!
		UpdateTask(taskInput: TaskInput!): Task!
		DeleteTask(taskId: ID!): ID!
	}
`;
