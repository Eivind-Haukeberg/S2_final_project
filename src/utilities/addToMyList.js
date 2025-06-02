// ----- FUNCTION PURPOSE ----->
// This utility function adds a media item to the current user's "My List" in Firestore,
// ensuring no duplicates are added.

import { db } from '../services/firebaseConfig';
import { auth } from '../services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const addToUserList = async (newItem) => {
  // ----- AUTHENTICATION CHECK ----->
  // Ensures a user is logged in before proceeding. Throws an error if not authenticated.
  const user = auth.currentUser;
  if (!user) throw new Error('User not logged in');

  // ----- FETCH USER DOCUMENT ----->
  // Retrieves the user's document from Firestore to access their existing "My List".
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const currentList = userData.myList || [];

    // ----- CHECK FOR DUPLICATES ----->
    // Checks if the item is already in the user's list. If so, throws an error.
    const exists = currentList.some((item) => item.title === newItem.title);
    if (exists) throw new Error('Item already in My List');

    // ----- UPDATE USER LIST IN FIRESTORE ----->
    // Adds the new item to the list and updates the Firestore document.
    const updatedList = [...currentList, newItem];
    await updateDoc(userRef, { myList: updatedList });
    return true;
  } else {
    // ----- ERROR HANDLING ----->
    // If the user's document does not exist, throw an appropriate error.
    throw new Error('User data not found');
  }
};
