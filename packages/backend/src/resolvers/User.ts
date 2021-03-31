import { FirebaseAdmin } from '../firebase/admin-app';
import { sequencePromiseT } from '../helpers/utils';
import { ApolloError } from 'apollo-server-express';

import { firestore } from 'firebase-admin/lib/firestore';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

import { dbTask, dbUser, Task, User } from '../models';

export default {
  CREATED_TASKS: getUserCreatedTasks,
  ASSIGNED_TASKS: getUserAssignedTasks,
};

async function getUserCreatedTasks(user: dbUser): Promise<User['CREATED_TASKS']>{
  try {
    const tasksQuery = await FirebaseAdmin.firestore()
      .collection('TASKS')
      .where('CREATOR_ID', '==', user.ID)
      .get();
    return sequencePromiseT(
      tasksQuery.docs
        .map((taskDoc: QueryDocumentSnapshot<dbTask>): dbTask => taskDoc.data())
        .map(async ({ ID, TITLE, STATUS}) => {
          const assigneesQuery = await FirebaseAdmin.firestore()
            .collection('TASKS')
            .where('CREATOR_ID', '==', ID)
            .get();

          const ASSIGNEES = assigneesQuery.docs
            .map((assigneeDoc: QueryDocumentSnapshot<dbUser>): dbUser => assigneeDoc.data())
            .map(({ ID, NAME, POSITION, EMAIL }: dbUser): User => ({ ID, NAME, POSITION, EMAIL }));

          return { ID, TITLE, STATUS, ASSIGNEES };
        }))
  } catch (err) {
    console.error(err);
    throw new ApolloError(err);
  }
}

async function getUserAssignedTasks(user: dbUser): Promise<Task[]> {
  try {
    const tasksQuery = await FirebaseAdmin.firestore()
      .collection('TASKS')
      .where('ASSIGNEES_IDS', 'array-contains', user.ID)
      .get();
    return sequencePromiseT(
      tasksQuery.docs
        .map((taskDoc: QueryDocumentSnapshot<dbTask>): dbTask => taskDoc.data())
        .map(async ({ ID, TITLE, STATUS, CREATOR_ID}) => {
          const assigneesQuery = await FirebaseAdmin.firestore()
            .collection('TASKS')
            .where('ASSIGNEES_IDS', 'array-contains', ID)
            .get();

          const ASSIGNEES = assigneesQuery.docs
            .map((assigneeDoc: QueryDocumentSnapshot<dbUser>): dbUser => assigneeDoc.data())
            .map(({ ID, NAME, POSITION, EMAIL }: dbUser): User => ({ ID, NAME, POSITION, EMAIL }));

          const creator = (await FirebaseAdmin.firestore()
            .collection('USERS')
            .doc(CREATOR_ID)
            .get())
            .data() as dbUser;

          return {
            ID,
            TITLE,
            STATUS,
            ASSIGNEES,
            CREATOR: {
              ID: creator.ID,
              NAME: creator.NAME,
              POSITION: creator.POSITION,
            },
          } as Task
        }))
  } catch (err) {
    console.error(err);
    throw new ApolloError(err);
  }
}
