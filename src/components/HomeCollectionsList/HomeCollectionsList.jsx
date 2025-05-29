import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import CollectionRow from '../CollectionRow/CollectionRow';

function HomeCollectionsList() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'collections'));
        const fetched = snapshot.docs.map((doc) => doc.data());
        setCollections(fetched);
      } catch (err) {
        setError('Could not fetch collections: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading)
    return (
      <p className='home-collections-list__loading'>Loading collections...</p>
    );
  if (error) return <p className='home-collections-list__error'>{error}</p>;

  return (
    <div className='home-collections-list'>
      {collections.map((col, index) => (
        <CollectionRow key={index} title={col.title} items={col.items} />
      ))}
    </div>
  );
}

export default HomeCollectionsList;
