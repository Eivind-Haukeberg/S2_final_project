import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import MyListGrid from '../components/MyListGrid/MyListGrid';
import '../components/MyListGrid/MyListGrid.css';
import { signOut } from 'firebase/auth';

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='my-page'>
      <h2 className='my-page__title'>My Information</h2>
      {userInfo ? (
        <>
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
            <button className='my-page__logout-button' onClick={handleLogout}>
              Log out
            </button>
          </div>
          <MyListGrid />
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default MyPage;
