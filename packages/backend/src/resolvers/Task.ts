import { dbTask, dbUser, User } from '../models';
import { ApolloError, ValidationError } from 'apollo-server-express';
import { FirebaseAdmin } from '../firebase/admin-app';

export default {
  CREATOR: getTaskCreator,
  ASSIGNEES: getTaskAssignees,
};

async function getTaskCreator(task: dbTask): Promise<User> {
  const taskCreatorDoc = await FirebaseAdmin.firestore()
    .collection('TASKS')
    .doc(task.ID)
    .get();
  if (!taskCreatorDoc.exists) {
    throw new ValidationError(`Task ${task.ID} not found`);
  }
  const { CREATOR_ID } = (taskCreatorDoc.data() as dbTask);

  const { ID, NAME, POSITION, EMAIL } = (await FirebaseAdmin.firestore()
    .collection('USERS')
    .doc(CREATOR_ID)
    .get())
    .data() as dbUser;

  return { ID, NAME, POSITION, EMAIL };
}

async function getTaskAssignees(task: dbTask): Promise<User[]> {
  try {
    const taskCreatorDoc = await FirebaseAdmin.firestore()
      .collection('TASKS')
      .doc(task.ID)
      .get();
    if (!taskCreatorDoc.exists) {
      throw new ValidationError(`Task ${task.ID} not found`);
    }
    const assigneesIds = (taskCreatorDoc.data() as dbTask).ASSIGNEES_IDS

    const assigneesQuery = await FirebaseAdmin.firestore()
      .collection('USERS')
      .where('ID', 'in', assigneesIds)
      .get();

    return assigneesQuery
      .docs
      .map(assigneeDoc => assigneeDoc.data() as dbUser)
      .map(({ ID, NAME, POSITION, EMAIL }): User => ({ ID, NAME, POSITION, EMAIL }))

  } catch (err) {
    console.error(err);
    throw new ApolloError(err);
  }
}
