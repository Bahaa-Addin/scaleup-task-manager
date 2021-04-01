import { FirebaseAdmin } from '../../firebase/admin-app';
import { ApolloError } from 'apollo-server-express';

import { User } from '../../models';

export default {
async CreateUser(_ : null, { userInput }): Promise<User> {
    try {
      if (userInput.ID) {
        await FirebaseAdmin.firestore()
          .collection('USERS')
          .doc(userInput.ID)
          .set(userInput);
        return userInput;
      }

      const userRef = FirebaseAdmin.firestore()
        .collection('USERS')
        .doc();
      const user = { ID: userRef.id, ...userInput};
      await userRef.set(user);

      return user;
    } catch (err) {
      console.error(err);
      throw new ApolloError(err);
    }
  },
  async UpdateUser(_ : null, { userInput }): Promise<User> {
    try {
      await FirebaseAdmin.firestore()
        .collection('USERS')
        .doc(userInput.ID)
        .update(userInput);

      const user = (await FirebaseAdmin.firestore()
        .collection('USERS')
        .doc(userInput.ID)
        .get())
        .data() as User;

      return user;
    } catch (err) {
      console.error(err);
      throw new ApolloError(err);
    }
  },
  async DeleteUser(_ : null, { userId }): Promise<string> {
    try {
      await FirebaseAdmin.firestore()
        .collection('USERS')
        .doc(userId)
        .delete();

      return userId;
    } catch (err) {
      console.error(err);
      throw new ApolloError(err);
    }
  },
}
