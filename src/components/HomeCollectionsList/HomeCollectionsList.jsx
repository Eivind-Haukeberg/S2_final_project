// ----- COMPONENT PURPOSE ----->
// This component fetches and displays a sorted list of media collections on the homepage,
// using the CollectionRow component for each collection.

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import CollectionRow from '../CollectionRow/CollectionRow';
import styles from './HomeCollectionsList.module.css';

function HomeCollectionsList() {
  // ----- STATE MANAGEMENT ----->
  // Manages the list of collections, loading status, and any fetch error messages.
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----- FETCH COLLECTIONS FROM FIRESTORE ----->
  // useEffect is used to fetch the 'collections' from Firestore on initial render.
  // On success, it updates state with the fetched data.
  // On failure, it sets an error message.
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'collections'));
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollections(fetched);
      } catch (err) {
        setError('Could not fetch collections: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // ----- HANDLE LOADING AND ERROR STATES ----->
  // Displays loading or error messages depending on current state.
  if (loading)
    return (
      <p className={styles['home-collections-list__loading']}>
        Loading collections...
      </p>
    );
  if (error)
    return <p className={styles['home-collections-list__error']}>{error}</p>;

  // ----- COMPONENT RENDERING ----->
  // Renders the fetched collections, sorted by their rowOrder field.
  // Each collection is passed to a CollectionRow component.
  return (
    <div className={styles['home-collections-list']}>
      {collections
        .sort((a, b) => (a.rowOrder || 0) - (b.rowOrder || 0))
        .map((col, index) => (
          <CollectionRow key={index} title={col.title} items={col.items} />
        ))}
    </div>
  );
}

export default HomeCollectionsList;
