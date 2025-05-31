import { db } from '../services/firebaseConfig';
import { auth } from '../services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const addToUserList = async (newItem) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not logged in');

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const currentList = userData.myList || [];

    const exists = currentList.some((item) => item.title === newItem.title);
    if (exists) throw new Error('Item already in My List');

    const updatedList = [...currentList, newItem];
    await updateDoc(userRef, { myList: updatedList });
    return true;
  } else {
    throw new Error('User data not found');
  }
};
