import { Task } from './Task';

export interface dbUser {
  ID: string,
  NAME: string,
  POSITION: string,
  EMAIL: string,
}

export interface User {
  ID: string,
  NAME: string,
  POSITION: string,
  EMAIL: string,
  CREATED_TASKS?: Omit<Task, 'CREATOR'>[],
  ASSIGNED_TASKS?: Task[],
}
