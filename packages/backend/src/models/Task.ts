import { User } from './User';

export interface dbTask {
  ID: string,
  TITLE: string,
  CREATOR_ID: string,
  ASSIGNEES_IDS: string[],
  STATUS: TaskStatus,
}

export interface Task {
  ID: string,
  TITLE: string,
  CREATOR?: User,
  ASSIGNEES?: User[],
  STATUS: string,
}

type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
