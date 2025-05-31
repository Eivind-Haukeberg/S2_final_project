import { useEffect, useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { removeFromUserList } from '../../utilities/removeFromMyList';
import styles from './MyListGrid.module.css';

function MyListGrid() {
  const [list, setList] = useState([]);

  const handleRemove = async (titleToRemove) => {
    try {
      const updated = await removeFromUserList(titleToRemove);
      setList(updated);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  useEffect(() => {
    const fetchList = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setList(data.myList || []);
      }
    };

    fetchList();
  }, []);

  return (
    <section className={styles['my-list-grid']}>
      <h3 className={styles['my-list-grid__title']}>My List</h3>
      <div className={styles['my-list-grid__grid']}>
        {list.map((item, index) => (
          <div key={index} className={styles['my-list-grid__card']}>
            <img
              src={item.image}
              alt={item.title}
              className={styles['my-list-grid__image']}
            />
            <p className={styles['my-list-grid__title']}>{item.title}</p>
            <button
              className={styles['my-list-grid__remove-button']}
              onClick={() => handleRemove(item)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyListGrid;
