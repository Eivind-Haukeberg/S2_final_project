// ----- FUNCTION PURPOSE ----->
// This utility function removes a media item (by title) from the current user's "My List"
// in Firestore and returns the updated list.

import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const removeFromUserList = async (itemTitle) => {
  // ----- AUTHENTICATION CHECK ----->
  // Ensures that a user is logged in before proceeding. Throws an error if not authenticated.
  const user = auth.currentUser;
  if (!user) throw new Error('Not logged in');

  // ----- FETCH USER DOCUMENT ----->
  // Retrieves the user's document from Firestore to access their current "My List".
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error('User not found');

  const currentList = userSnap.data().myList || [];

  // ----- FILTER ITEM OUT OF LIST ----->
  // Removes the item with the matching title from the user's list.
  const updatedList = currentList.filter((item) => item.title !== itemTitle);

  // ----- UPDATE USER LIST IN FIRESTORE ----->
  // Saves the filtered list back to the user's Firestore document.
  await updateDoc(userRef, { myList: updatedList });

  return updatedList;
};
