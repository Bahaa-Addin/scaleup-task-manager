import { FirebaseAdmin } from '../../firebase/admin-app';
import { firestore } from 'firebase-admin/lib/firestore';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

import { sequencePromiseT } from '../../helpers/utils';

import { dbTask, Task } from '../../models';


export default async function (): Promise<Task[]> {
  const allTasksQuery = await FirebaseAdmin.firestore()
    .collection('TASKS')
    .get()

  return sequencePromiseT(
    allTasksQuery.docs
      .map((task: QueryDocumentSnapshot<dbTask>): dbTask => task.data())
      .map(async (task) => {
        return {
          ID: task.ID,
          TITLE: task.TITLE,
          STATUS: task.STATUS,
        }
      }))
}
