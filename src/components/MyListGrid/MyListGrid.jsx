import { useEffect, useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import Button from '../Button/Button';
import styles from './MyListGrid.module.css';

function MyListGrid() {
  const [myList, setMyList] = useState([]);

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

  const handleRemove = async (item) => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      myList: arrayRemove(item),
    });
    fetchMyList(); // refresh after removal
  };

  useEffect(() => {
    fetchMyList();
  }, []);

  return (
    <div className={styles['my-list-grid']}>
      <h3 className={styles['my-list-grid__heading']}>My List</h3>
      <div className={styles['my-list-grid__items']}>
        {myList.map((item, index) => (
          <div key={index} className={styles['my-list-grid__card']}>
            <div className={styles['my-list-grid__image-wrapper']}>
              <a
                href={`https://www.themoviedb.org/${item.type}/${item.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className={styles['my-list-grid__link']}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles['my-list-grid__image']}
                />
                <div className={styles['my-list-grid__title']}>
                  {item.title}
                </div>
              </a>
              <Button
                type='button'
                variant='mylist-remove'
                onClick={() => handleRemove(item)}
                className='button--mylist-remove'>
                x
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListGrid;
