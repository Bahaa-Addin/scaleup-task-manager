import { FirebaseAdmin } from '../../firebase/admin-app';
import { ApolloError } from 'apollo-server-express';
import { User } from '../../models';

export default async function (_: null, args: { searchTerm: string }): Promise<User[]> {
  try {
    const userQuery = await FirebaseAdmin.firestore()
      .collection('USERS')
      .where('NAME', '>=', args.searchTerm)
      .get();

    if (userQuery.empty) {
      return [];
    }

    return userQuery.docs.map(userDoc => userDoc.data() as User);
  } catch (err) {
    console.error(err);
    throw new ApolloError(err);
  }
}
