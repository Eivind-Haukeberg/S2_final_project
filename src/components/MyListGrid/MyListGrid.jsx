import { useEffect, useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function MyListGrid() {
  const [list, setList] = useState([]);

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
