import { useEffect, useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { removeFromUserList } from '../../utilities/removeFromMyList';

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
    <section className='my-list-grid'>
      <h3 className='my-list-grid__title'>My List</h3>
      <div className='my-list-grid__items'>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className='my-list-grid__card'>
              <img
                src={item.image}
                alt={item.title}
                className='my-list-grid__image'
              />
              <p className='my-list-grid__name'>{item.title}</p>
              <button
                className='my-list-grid__remove-button'
                onClick={() => handleRemove(item.title)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className='my-list-grid__empty'>
            No movies or series in your list yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default MyListGrid;
