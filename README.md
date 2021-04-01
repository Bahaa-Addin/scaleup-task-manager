# ScaleUp Task Manager
## Models:
```typescript
 interface User {
  ID: string,
  NAME: string,
  POSITION: string,
  EMAIL: string,
  CREATED_TASKS?: Omit<Task, 'CREATOR'>[],
  ASSIGNED_TASKS?: Task[],
}
interface Task {
  ID: string,
  TITLE: string,
  CREATOR: User,
  ASSIGNEES: User[],
  STATUS: string,
}
type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
```
## Config
Run:
```bash
npm i -g firebase-tools
```
From the root folder:

In `packages/backend` you need to have these environment variables in `.env` file
```
APOLLO_API_KEY=<Apollo API Key>
FB_PROJECT_ID=<Firebase Project ID>
FB_CLIENT_EMAIL=<Firebase Project Client Email>
FB_PRIVATE_KEY=<Firebase Project Private Key>
```
## Installation
From the rood folder run:
```bash
npm i
lerna bootstrap
lerna run start
```
## Usage
From your browser, go to `http://localhost:3000` and register a new account.

You can use GraphQL Playground on `http://localhost:4000/graphql`
## Notes
Make sure you do not have any processes running on `localhost` ports `3000` & `4000`
