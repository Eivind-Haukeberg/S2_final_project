// ----- COMPONENT PURPOSE ----->
// This component displays the logged-in user's personal information and their saved media list.
// It also provides a logout button that signs the user out and redirects them to the homepage.

import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import MyListGrid from '../components/MyListGrid/MyListGrid';
import styles from '../components/MyListGrid/MyListGrid.module.css';
import { signOut } from 'firebase/auth';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  // ----- STATE MANAGEMENT ----->
  // Stores the user's personal information fetched from Firestore.
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // ----- FETCH USER INFO FROM FIRESTORE ----->
  // Retrieves the current user's information from the 'users' collection in Firestore
  // and updates the local state.
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

  // ----- HANDLE LOGOUT ----->
  // Signs the user out of Firebase Auth and navigates back to the homepage.
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // ----- COMPONENT RENDERING ----->
  // Displays the user's personal details and the MyListGrid component if user info is loaded.
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
