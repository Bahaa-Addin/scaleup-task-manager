// @ts-check
import {gql} from "@apollo/client";
import {client} from "../shared/context/ApolloContext";

export async function createUser(userInput) {
  return client
  .mutate({
    mutation: gql`
			mutation CreateUser($userInput: UserInput!) {
				CreateUser(userInput: $userInput) {
					ID
					NAME
					POSITION
					EMAIL
				}
			}
    `,
    variables: { userInput }
  })
  .then(({ data: { CreateUser: createdUser} }) => createdUser);
}

export async function updateUser(userInput) {
  return client
  .mutate({
    mutation: gql`
			mutation UpdateUser($userInput: UserInput!) {
				UpdateUser(userInput: $userInput) {
					ID
					NAME
					POSITION
					EMAIL
				}
			}
    `,
    variables: { userInput }
  })
  .then(({ data: { UpdateUser: updatedUser} }) => updatedUser);
}

export async function deleteUser(userId) {
  return client
  .mutate({
    mutation: gql`
			mutation DeleteUser($userId: ID!) {
				DeleteUser(userId: $userId)
			}
    `,
    variables: { userId }
  })
  .then(({ data: { DeleteUser: userId } }) => userId);
}

export async function getUserInfo(id) {
  return client
    .query({
      query: gql`
        query GetUser($id: String!) {
          User(id: $id) {
            ID
            NAME
            POSITION
            EMAIL
						ASSIGNED_TASKS {
              ID
              TITLE
              STATUS
            }
					}
        }
      `,
    variables: { id }
  })
  .then(({ data: { User } }) => User);
}

export async function getAllUsers() {
  return client
  .query({
    query: gql`
			query GetAllUsers {
				Users {
					ID
					NAME
					POSITION
				}
			}
    `
  })
  .then(({ data: { Users } }) => Users);
}

export async function getAllUsersWithAssignedTasks() {
  return client
  .query({
    query: gql`
			query getAllUsersWithAssignedTasks {
				Users {
					ID
					NAME
					POSITION
					ASSIGNED_TASKS {
						ID
						TITLE
						STATUS
					}
				}
			}
    `
  })
  .then(({ data: { Users } }) => Users);
}

export async function getAllUsersWithCreatedTasks() {
  return client
  .query({
    query: gql`
			query getAllUsersWithCreatedTasks {
				Users {
					ID
					NAME
					POSITION
					CREATED_TASKS{
						ID
						TITLE
						STATUS
					}
				}
			}
    `
  })
  .then(({ data: { Users } }) => Users);
}

export async function searchUsersByName(searchTerm) {
  return client
  .query({
    query: gql`
			query SearchUsersByName($searchTerm: String!) {
				SearchUsersByName(searchTerm: $searchTerm) {
					ID
					NAME
				}
			}
    `,
    variables: { searchTerm }
  })
  .then(({ data: { SearchUsersByName } }) => SearchUsersByName);
}
