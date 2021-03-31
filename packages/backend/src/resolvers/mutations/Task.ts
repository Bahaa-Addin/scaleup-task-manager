import { FirebaseAdmin } from '../../firebase/admin-app';
import { ApolloError } from 'apollo-server-express';
import { Task } from '../../models';

export default {
  async CreateTask(_ : null, { taskInput }): Promise<Task> {
    try {
      const taskRef = FirebaseAdmin.firestore()
        .collection('TASKS')
        .doc();
      const task = { ID: taskRef.id, ...taskInput};
      await taskRef.set(task);

      return task;
    } catch (err) {
      console.error(err);
      throw new ApolloError(err);
    }
  },
  async UpdateTask(_ : null, { taskInput }): Promise<Task> {
    try {
      await FirebaseAdmin.firestore()
        .collection('TASKS')
        .doc(taskInput.ID)
        .update(taskInput);

      const task = (await FirebaseAdmin.firestore()
        .collection('TASKS')
        .doc(taskInput.ID)
        .get())
        .data() as Task;

      return task;
    } catch (err) {
      console.error(err);
      throw new ApolloError(err);
    }
  },
  async DeleteTask(_ : null, { taskId }): Promise<string> {
    try {
      await FirebaseAdmin.firestore()
        .collection('TASKS')
        .doc(taskId)
        .delete();

      return taskId;
    } catch (err) {
      console.error(err);
      throw new ApolloError(err);
    }
  },
}
