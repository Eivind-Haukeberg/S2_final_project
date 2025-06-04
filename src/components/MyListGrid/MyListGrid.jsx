// ----- COMPONENT PURPOSE ----->
// This component displays a grid of media items that the user has saved to "My List".
// It also allows users to remove items from their list using Firebase Firestore.

import { useEffect, useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import Button from '../Button/Button';
import styles from './MyListGrid.module.css';

function MyListGrid() {
  // ----- STATE MANAGEMENT ----->
  // Holds the user's saved list of media items.
  const [myList, setMyList] = useState([]);

  // ----- FETCH USER LIST FROM FIRESTORE ----->
  // Retrieves the current user's saved list from Firestore and updates local state.
  const fetchMyList = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setMyList(data.myList || []);
    }
  };

  // ----- HANDLE ITEM REMOVAL ----->
  // Removes the specified item from the user's list in Firestore and refreshes the local list.
  const handleRemove = async (item) => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      myList: arrayRemove(item),
    });
    fetchMyList(); // refresh after removal
  };

  // ----- INITIAL DATA FETCHING ----->
  // Fetches the list when the component mounts.
  useEffect(() => {
    fetchMyList();
  }, []);

  // ----- COMPONENT RENDERING ----->
  // Renders the user's saved media list in a grid layout. Each item includes a link and a remove button.
  return (
    <div className={styles['my-list-grid']}>
      <h3 className={styles['my-list-grid__heading']}>My List</h3>
      <div className={styles['my-list-grid__items']}>
        {myList.map((item, index) => (
          <div key={index} className={styles['my-list-grid__card']}>
            <a
              href={`https://www.themoviedb.org/${item.type}/${item.id}`}
              target='_blank'
              rel='noopener noreferrer'
              className={styles['my-list-grid__link']}>
              <div className={styles['my-list-grid__image-wrapper']}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles['my-list-grid__image']}
                />
                <div className={styles['my-list-grid__title']}>
                  {item.title}
                </div>
              </div>
            </a>

            <Button
              type='button'
              variant='mylist-remove'
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation
                e.preventDefault(); // Ensure link is not triggered
                handleRemove(item);
              }}
              className='button--mylist-remove'>
              x
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListGrid;
