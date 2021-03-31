import { FirebaseAdmin } from '../../firebase/admin-app';
import { ApolloError, ValidationError } from 'apollo-server-express';

import { User } from '../../models';

export default async function (_: null, args: { id: string }): Promise<User> {
  try {
    const userDoc = await FirebaseAdmin.firestore()
      .collection('USERS')
      .doc(args.id)
      .get();
    if (!userDoc.exists) {
      throw new ValidationError(`User ${args.id} not found!`);
    }
    return userDoc.data() as User;
    } catch (err) {
      console.error(err);
      throw new ApolloError(err);
    }
}
