import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import MyListGrid from '../components/MyListGrid/MyListGrid';
import styles from '../components/MyListGrid/MyListGrid.module.css';
import { signOut } from 'firebase/auth';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

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
      navigate('/'); // Redirect to homepage
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
            <Button onClick={handleLogout} variant='primary'>
              Log Out
            </Button>
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
