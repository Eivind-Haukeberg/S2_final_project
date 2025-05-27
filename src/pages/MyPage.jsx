import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='my-page'>
      <h2 className='my-page__title'>My Information</h2>
      {userInfo ? (
        <div className='my-page__info'>
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Country:</strong> {userInfo.country}
          </p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default MyPage;
