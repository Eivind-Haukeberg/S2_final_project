import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const removeFromUserList = async (itemTitle) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not logged in');

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error('User not found');

  const currentList = userSnap.data().myList || [];

  const updatedList = currentList.filter((item) => item.title !== itemTitle);

  await updateDoc(userRef, { myList: updatedList });

  return updatedList;
};
