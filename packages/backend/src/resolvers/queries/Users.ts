import { FirebaseAdmin } from '../../firebase/admin-app';

import { ApolloError } from 'apollo-server-express';
import { sequencePromiseT } from '../../helpers/utils';

import { dbUser, User } from '../../models';

export default async function (): Promise<User[]> {
  try {
    const usersQuery = await FirebaseAdmin.firestore()
      .collection('USERS')
      .get();
    if (usersQuery.empty) {
    return [];
  }
  return sequencePromiseT(usersQuery.docs
    .map(userDoc => userDoc.data() as dbUser)
    .map(async (user) => {
      return {
        ID: user.ID,
        NAME: user.NAME,
        POSITION: user.POSITION,
        EMAIL: user.EMAIL
      };
    }))
  } catch (err) {
    console.error(err);
    throw new ApolloError(err);
  }
}
